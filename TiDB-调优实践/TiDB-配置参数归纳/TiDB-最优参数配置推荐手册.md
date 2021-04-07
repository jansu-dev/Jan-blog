# TiDB-最优参数配置推荐手册
时间:2021-03-12


server_configs:
  tidb:
    binlog.enable: true
    log.level: info
    log.slow-threshold: 300
    lower-case-table-names: 1
    max-index-length: 6144
    mem-quota-query: 68719476736
    oom-action: cancel
    performance.max-procs: 0
    performance.max-txn-ttl: 7200000
    performance.stats-lease: 3s
    performance.stmt-count-limit: 50000
    performance.txn-total-size-limit: 2147483648
    pessimistic-txn.enable: true
    pessimistic-txn.max-retry-count: 256
    prepared-plan-cache.capacity: 100
    prepared-plan-cache.enabled: false
    prepared-plan-cache.memory-guard-ratio: 0.1
    token-limit: 3000
  tikv:
    log-level: info
    pessimistic-txn.enabled: true
    raftdb.defaultcf.dynamic-level-bytes: true
    readpool.coprocessor.high-concurrency: 8
    readpool.coprocessor.low-concurrency: 8
    readpool.coprocessor.normal-concurrency: 8
    readpool.storage.high-concurrency: 4
    readpool.storage.low-concurrency: 4
    readpool.storage.normal-concurrency: 4
    readpool.unified.max-thread-count: 25
    rocksdb.lockcf.dynamic-level-bytes: true
    rocksdb.writecf.dynamic-level-bytes: true
    server.grpc-concurrency: 4
    storage.block-cache.capacity: 256GB
  pd:
    replication.location-labels:


    