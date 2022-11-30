

## Derive Stats 

first of all, in psysical period, optimizer'll get stats for every column and schema.  


## find Best Plan 
This [PR](https://github.com/pingcap/tidb/pull/35378) indeciates sometimes optimizer cannot discern which is the best datasource,  so a new cost formular for `Selection/TableScan/IndexScan` has been merged. which are here below:  
1. Selection : rows*num-filters*cpu-factor, which Tiflash has a specific cpu-factor 
2. TableScan : rows*log(row-size)*scan-factor, which Tiflash has a specific cpu-factor   
3. indexScan : rows*log(row-size)*scan-factor 

## about cost plan 

Actually, the method [getPlanCostVer1/getPlanCostVer2](https://github.com/pingcap/tidb/blob/17fac8bc2883dd287481a60f019beae948191a47/planner/core/plan.go#L337) of interface PhysicalPlan is use get psysical every operand cost. I mean, by their different implentation, you could figure out how it's calculated.   

plan-cost = child-cost + filter-cost

### cost expression of version 2 
1. cpu-factor : tidb_cpu_factor=30 or tiflash_cpu_factor=5 or tikv_cpu_factor=30 
2. tiflash_scan_factor : 5
3. tikv_desc_scan_factor : 100

| function name | name | factor name |
| - | - | - |
| TiDBTemp | tidb_temp_table_factor | 0 |
| TiKVScan:     | tikv_scan_factor | 100 |
| TiKVDescScan: | tikv_desc_scan_factor | 150 |
| TiFlashScan:  | tiflash_scan_factor | 5 |
| TiDBCPU:      | tidb_cpu_factor | 30 |
| TiKVCPU:      | tikv_cpu_factor | 30 |
| TiFlashCPU:   | tiflash_cpu_factor | 5 |
| TiDB2KVNet:   | tidb_kv_net_factor | 8 |
| TiDB2FlashNet:| tidb_flash_net_factor | 4 |
| TiFlashMPPNet:| tiflash_mpp_net_factor | 4 |
| TiDBMem:      | tidb_mem_factor | 1 |
| TiKVMem:      | tikv_mem_factor | 1 |
| TiFlashMem:   | tiflash_mem_factor | 1 |
| TiDBDisk:     | tidb_disk_factor | 1000 |
| TiDBRequest:  | tidb_request_factor | 9500000 |

[here](https://github.com/pingcap/tidb/blob/17fac8bc2883dd287481a60f019beae948191a47/statistics/table.go#L1289) are the code addr: 
rowSize = AvgRowSize + 19 
19 = [tablePrefix(1) + tableID(8) + indexPrefix(2) + indexID(8)]
if coll.Pseudo || len(coll.Columns) == 0 || coll.Count == 0 --> size = pseudoColSize(8) * float64(len(cols)) . 
if !ok || (!colHist.IsHandle && colHist.TotColSize == 0 && (colHist.NullCount != coll.Count)) --> size += pseudoColSize    
    if sessionVars.EnableChunkRPC && !isForScan --> size += colHist.AvgColSizeChunkFormat(coll.Count)    
    else size += colHist.AvgColSize(coll.Count, isEncodedKey)

| TaskType | version | cost calculated expression | code addr |
| - | - | - | - |
| PhysicalSelection | 2 | cost = rows \* len(expressions) \* cpu-factor | [here]() |
| PhysicalProjection | 2 | cost = (proj-cost = rows \* len(expressions) \* cpu-factor) / projection-concurrency  | [here](https://github.com/pingcap/tidb/blob/17fac8bc2883dd287481a60f019beae948191a47/planner/core/plan_cost_ver2.go#L85) |
| PhysicalIndexScan | 2 | cost = rows \* log<sub>2</sub><sup>max(rowSize, 2)</sup> \* scan-factor |  |
| PhysicalTableScan | 2 | cost = rows \* log<sub>2</sub><sup>max(rowSize, 2)</sup> \* scan-factor | [here](https://github.com/pingcap/tidb/blob/17fac8bc2883dd287481a60f019beae948191a47/planner/core/plan_cost_ver2.go#L126) |
| PhysicalIndexReader | 2 |  cost = ((rows * row-size * net-factor) + (num-tasks * seek-factor)) / dist-sql-scan-concurrency(15) | [here](https://github.com/pingcap/tidb/blob/17fac8bc2883dd287481a60f019beae948191a47/planner/core/plan_cost_ver2.go#L150) |
| PhysicalTableReader | 2 | cost = (child-cost + (rows * row-size * net-factor) + (num-tasks * seek-factor)) / concurrency | [here](https://github.com/pingcap/tidb/blob/17fac8bc2883dd287481a60f019beae948191a47/planner/core/plan_cost_ver2.go#L178) |
| PhysicalIndexLookUpReader | 2 | cost = (index-child-cost + index-net-cost + index-seek-cost) / dist-concurrency + ((table-child-cost + table-net-cost + table-seek-cost) / dist-concurrency + double-read-seek-cost + double-read-cpu-cost) / double-read-concurrency | [here](https://github.com/pingcap/tidb/blob/17fac8bc2883dd287481a60f019beae948191a47/planner/core/plan_cost_ver2.go#L217) |
| PhysicalIndexMergeReader | 2 | cost = (table-child-cost + table-net-cost + table-seek-cost) / dist-concurrency + sum((index-child-cost + index-net-cost + index-seek-cost) / dist-concurrency) | [here](https://github.com/pingcap/tidb/blob/17fac8bc2883dd287481a60f019beae948191a47/planner/core/plan_cost_ver2.go#L269) |
| PhysicalSort | 2 | cost = child-cost + (rows * log2(rows) * len(sort-items) * cpu-factor) + sort-mem-cost + sort-disk-cost | [here](https://github.com/pingcap/tidb/blob/17fac8bc2883dd287481a60f019beae948191a47/planner/core/plan_cost_ver2.go#L322) |
| PhysicalTopN | 2 | cost = child-cost + (rows * log2(N) * len(sort-items) * cpu-factor) + (N * row-size * mem-factor) | [here](https://github.com/pingcap/tidb/blob/17fac8bc2883dd287481a60f019beae948191a47/planner/core/plan_cost_ver2.go#L372) |
| PhysicalStreamAgg | 2 | cost = child-cost + agg-cost + group-cost | [here](https://github.com/pingcap/tidb/blob/17fac8bc2883dd287481a60f019beae948191a47/planner/core/plan_cost_ver2.go#L402) |
| PhysicalHashAgg | 2 | child-cost + (agg-cost + group-cost + hash-build-cost + hash-probe-cost) / concurrency | [here](https://github.com/pingcap/tidb/blob/17fac8bc2883dd287481a60f019beae948191a47/planner/core/plan_cost_ver2.go#L425) |
| PhysicalMergeJoin | 2 | cost = left-child-cost + right-child-cost + filter-cost + group-cost | [here]() |
| PhysicalMergeJoin | 2 |  | [here]() |
| PhysicalMergeJoin | 2 |  | [here]() |
| PhysicalMergeJoin | 2 |  | [here]() |
| PhysicalMergeJoin | 2 |  | [here]() |
| PhysicalMergeJoin | 2 |  | [here]() |
| PhysicalMergeJoin | 2 |  | [here]() |
| PhysicalMergeJoin | 2 |  | [here]() |


from [here](distSQLScanConcurrency),we can take a look on differenct default values of concurrencys, like DefDistSQLScanConcurrency = 15.