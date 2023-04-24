# Dumpling 参数调优

## thread参数case精讲

备份并发线程数默认值是4
更改线程前后，total take(real time): 8.887353811s和total take(real time): 7.944831691s可以看到耗费时间有一定缩短

```sql
MySQL [jan]> use jan;
Database changed
MySQL [jan]> show tables;
+---------------+
| Tables_in_jan |
+---------------+
| sbtest1       |
| sbtest2       |
| t             |
+---------------+
3 rows in set (0.00 sec)

MySQL [jan]> select count(*) from sbtest2;
+----------+
| count(*) |
+----------+
|   424704 |
+----------+
1 row in set (0.61 sec)

MySQL [jan]> select count(*) from sbtest1;
+----------+
| count(*) |
+----------+
|   416640 |
+----------+
1 row in set (0.70 sec)


[tidb@tiup-tidb41 dumpling_dir]$ tiup dumpling -u root -P 4000 --host 192.168.169.41 -o /home/tidb/dumpling_dir --database jan
Starting component `dumpling`: /home/tidb/.tiup/components/dumpling/v4.0.9/.
......
......
[2021/01/13 09:50:34.990 -05:00] [INFO] [collector.go:212] ["backup Success summary: total backup ranges: 7, total success: 7, total failed: 0, total take(backup time): 8.887279789s, total take(real time): 8.887353811s, total size(MB): 161.07, avg speed(MB/s): 18.12, total rows: 841351"]
[2021/01/13 09:50:35.386 -05:00] [INFO] [main.go:78] ["dump data successfully, dumpling will exit now"]


[tidb@tiup-tidb41 dumpling_dir]$ tiup dumpling -u root -P 4000 --host 192.168.169.41 -o /home/tidb/dumpling_dir --database jan --threads 18
Starting component `dumpling`: /home/tidb/.tiup/components/dumpling/v4.0.9/dumpling -u root -P 4000 --host 192.168.169.41 -o /home/tidb/dumpling_dir --database jan --threads 18
......
......
[2021/01/13 09:58:21.537 -05:00] [INFO] [collector.go:212] ["backup Success summary: total backup ranges: 7, total success: 7, total failed: 0, total take(backup time): 7.944799606s, total take(real time): 7.944831691s, total size(MB): 161.07, avg speed(MB/s): 20.27, total rows: 841351"]
[2021/01/13 09:58:21.539 -05:00] [INFO] [main.go:78] ["dump data successfully, dumpling will exit now"]
```

## filiter参数case精讲  

```shell
MySQL [jan]> create database dumptest1;
MySQL [jan]> create database dumptest2;
MySQL [jan]> create database dump_test;
MySQL [dumptest1]> create table a1 (id int,name varchar(20));
MySQL [dumptest1]> create table a2 (id int,name varchar(20));
MySQL [dumptest2]> create table a3 (id int,name varchar(20));
MySQL [jan]> use dumptest1
MySQL [dumptest1]> insert into dumptest1.a1 values (1,'jan_test1'),(2,'jan_test2');
MySQL [dumptest1]> insert into dumptest1.a2 values (3,'jan_test3'),(4,'jan_test4');
MySQL [jan]> use dumptest2
MySQL [dumptest1]> insert into dumptest2.a3 values (5,'jan_test5'),(6,'jan_test6');
MySQL [dumptest2]> use dump_test
MySQL [dump_test]> create table a4 (id int,name varchar(20));
MySQL [dump_test]> insert into dump_test.a4 values (7,'jan_test7');
MySQL [dump_test]> create table b5 (id int,name varchar(20));
MySQL [dump_test]> insert into dump_test.b5 values (8,'jan_test8');


[tidb@tiup-tidb41 dump]$ tiup dumpling -u root -P 4000 --host 192.168.169.41 -o /home/tidb/dumpling_dir --filter "dump*test*.a*"
Starting component `dumpling`: /home/tidb/.tiup/components/dumpling/v4.0.9/dumpling -u root -P 4000 --host 192.168.169.41 -o /home/tidb/dumpling_dir --filter dump*test*.a*
Release version: v4.0.9
Git commit hash: 11d8d5dad31210a1ec6afef9d3c16b397f2fc9fb
Git branch:      heads/refs/tags/v4.0.9
Build timestamp: 2020-12-19 04:53:02Z
Go version:      go version go1.13 linux/amd64

[2021/01/13 09:25:32.026 -05:00] [INFO] [config.go:598] ["detect server type"] [type=TiDB]
[2021/01/13 09:25:32.026 -05:00] [INFO] [config.go:617] ["detect server version"] [version=4.0.9]
[2021/01/13 09:25:33.279 -05:00] [INFO] [client.go:166] ["[pd] create pd client with endpoints"] [pd-address="[192.168.169.42:2379,192.168.169.41:2379,192.168.169.43:2379]"]
[2021/01/13 09:25:33.292 -05:00] [INFO] [base_client.go:236] ["[pd] update member urls"] [old-urls="[http://192.168.169.42:2379,http://192.168.169.41:2379,http://192.168.169.43:2379]"] [new-urls="[http://192.168.169.41:2379,http://192.168.169.42:2379,http://192.168.169.43:2379]"]
[2021/01/13 09:25:33.292 -05:00] [INFO] [base_client.go:252] ["[pd] switch leader"] [new-leader=http://192.168.169.41:2379] [old-leader=]
[2021/01/13 09:25:33.292 -05:00] [INFO] [base_client.go:102] ["[pd] init cluster id"] [cluster-id=6915787285265719754]
[2021/01/13 09:25:34.253 -05:00] [INFO] [collector.go:212] ["backup Success summary: total backup ranges: 13, total success: 13, total failed: 0, total take(backup time): 596.858981ms, total take(real time): 596.892233ms, total size(Byte): 331, avg speed(Byte/s): 554.57, total rows: 7"]
[2021/01/13 09:25:34.265 -05:00] [INFO] [main.go:78] ["dump data successfully, dumpling will exit now"]


# 只有与 a 相关的表被导出，dump_test.b5 表在到处时因为没有满足过滤条件没有被导出
[tidb@tiup-tidb41 dumpling_dir]$ ll
total 52
-rw-r--r-- 1 tidb tidb  87 Jan 13 09:25 dumptest1.a1.000000000.sql
-rw-r--r-- 1 tidb tidb 173 Jan 13 09:25 dumptest1.a1-schema.sql
-rw-r--r-- 1 tidb tidb  87 Jan 13 09:25 dumptest1.a2.000000000.sql
-rw-r--r-- 1 tidb tidb 173 Jan 13 09:25 dumptest1.a2-schema.sql
-rw-r--r-- 1 tidb tidb 100 Jan 13 09:25 dumptest1-schema-create.sql
-rw-r--r-- 1 tidb tidb  87 Jan 13 09:25 dumptest2.a3.000000000.sql
-rw-r--r-- 1 tidb tidb 173 Jan 13 09:25 dumptest2.a3-schema.sql
-rw-r--r-- 1 tidb tidb 173 Jan 13 09:25 dumptest2.a4-schema.sql
-rw-r--r-- 1 tidb tidb 100 Jan 13 09:25 dumptest2-schema-create.sql
-rw-r--r-- 1 tidb tidb  70 Jan 13 09:25 dump_test.a4.000000000.sql
-rw-r--r-- 1 tidb tidb 173 Jan 13 09:25 dump_test.a4-schema.sql
-rw-r--r-- 1 tidb tidb 100 Jan 13 09:25 dump_test-schema-create.sql
-rw-r--r-- 1 tidb tidb 146 Jan 13 09:25 metadata
```

## rows参数case精讲  

```sql
[tidb@tiup-tidb41 dumpling_dir]$ tiup dumpling -u root -P 4000 --host 192.168.169.41 -o /home/tidb/dumpling_dir --database jan --tables-list jan.sbtest1 --rows 100000
Starting component `dumpling`: /home/tidb/.tiup/components/dumpling/v4.0.9/dumpling -u root -P 4000 --host 192.168.169.41 -o /home/tidb/dumpling_dir --database jan --tables-list jan.sbtest1 --rows 100000
Release version: v4.0.9
Git commit hash: 11d8d5dad31210a1ec6afef9d3c16b397f2fc9fb
Git branch:      heads/refs/tags/v4.0.9
Build timestamp: 2020-12-19 04:53:02Z
Go version:      go version go1.13 linux/amd64

[2021/01/13 10:12:57.744 -05:00] [INFO] [config.go:598] ["detect server type"] [type=TiDB]
[2021/01/13 10:12:57.745 -05:00] [INFO] [config.go:617] ["detect server version"] [version=4.0.9]
[2021/01/13 10:12:57.989 -05:00] [INFO] [client.go:166] ["[pd] create pd client with endpoints"] [pd-address="[192.168.169.42:2379,192.168.169.41:2379,192.168.169.43:2379]"]
[2021/01/13 10:12:58.000 -05:00] [INFO] [base_client.go:236] ["[pd] update member urls"] [old-urls="[http://192.168.169.42:2379,http://192.168.169.41:2379,http://192.168.169.43:2379]"] [new-urls="[http://192.168.169.41:2379,http://192.168.169.42:2379,http://192.168.169.43:2379]"]
[2021/01/13 10:12:58.000 -05:00] [INFO] [base_client.go:252] ["[pd] switch leader"] [new-leader=http://192.168.169.41:2379] [old-leader=]
[2021/01/13 10:12:58.001 -05:00] [INFO] [base_client.go:102] ["[pd] init cluster id"] [cluster-id=6915787285265719754]
[2021/01/13 10:12:59.092 -05:00] [INFO] [dump.go:336] ["get estimated rows count"] [estimateCount=416640]
[2021/01/13 10:13:03.875 -05:00] [INFO] [collector.go:212] ["backup Success summary: total backup ranges: 6, total success: 6, total failed: 0, total take(backup time): 4.911218801s, total take(real time): 4.91127658s, total size(MB): 79.76, avg speed(MB/s): 16.24, total rows: 416640"]
[2021/01/13 10:13:03.877 -05:00] [INFO] [main.go:78] ["dump data successfully, dumpling will exit now"]
[tidb@tiup-tidb41 dumpling_dir]$ ll
total 81700
-rw-r--r-- 1 tidb tidb 20881999 Jan 13 10:13 jan.sbtest1.000000000.sql
-rw-r--r-- 1 tidb tidb 21079537 Jan 13 10:13 jan.sbtest1.000000001.sql
-rw-r--r-- 1 tidb tidb 20906245 Jan 13 10:13 jan.sbtest1.000000002.sql
-rw-r--r-- 1 tidb tidb 20768759 Jan 13 10:13 jan.sbtest1.000000003.sql
-rw-r--r-- 1 tidb tidb      309 Jan 13 10:12 jan.sbtest1-schema.sql
-rw-r--r-- 1 tidb tidb       94 Jan 13 10:12 jan-schema-create.sql
-rw-r--r-- 1 tidb tidb      146 Jan 13 10:13 metadata



[tidb@tiup-tidb41 dumpling_dir]$ cat jan.sbtest1.000000003.sql |wc -l
103346
[tidb@tiup-tidb41 dumpling_dir]$ cat jan.sbtest1.000000002.sql |wc -l
104030
[tidb@tiup-tidb41 dumpling_dir]$ cat jan.sbtest1.000000001.sql |wc -l
104893
[tidb@tiup-tidb41 dumpling_dir]$ cat jan.sbtest1.000000000.sql |wc -l
104460
```

## filesize参数case精讲  

filesize可以配合lighting导入

```sql
[tidb@tiup-tidb41 dumpling_dir]$ tiup dumpling -u root -P 4000 --host 192.168.169.41 -o /home/tidb/dumpling_dir --database jan --tables-list "jan.sbtest1" 

[tidb@tiup-tidb41 dumpling_dir]$ du -sh
80M .
[tidb@tiup-tidb41 dumpling_dir]$ ll -h
total 80M
-rw-r--r-- 1 tidb tidb 80M Jan 13 10:20 jan.sbtest1.000000000.sql
-rw-r--r-- 1 tidb tidb 309 Jan 13 10:20 jan.sbtest1-schema.sql
-rw-r--r-- 1 tidb tidb  94 Jan 13 10:20 jan-schema-create.sql
-rw-r--r-- 1 tidb tidb 146 Jan 13 10:20 metadata

[tidb@tiup-tidb41 dumpling_dir]$ tiup dumpling -u root -P 4000 --host 192.168.169.41 -o /home/tidb/dumpling_dir --database jan --tables-list "jan.sbtest1" --filesize 30M

[tidb@tiup-tidb41 dumpling_dir]$ ll -h
total 80M
-rw-r--r-- 1 tidb tidb 31M Jan 13 10:20 jan.sbtest1.000000000.sql
-rw-r--r-- 1 tidb tidb 31M Jan 13 10:20 jan.sbtest1.000000001.sql
-rw-r--r-- 1 tidb tidb 20M Jan 13 10:20 jan.sbtest1.000000002.sql
-rw-r--r-- 1 tidb tidb 309 Jan 13 10:20 jan.sbtest1-schema.sql
-rw-r--r-- 1 tidb tidb  94 Jan 13 10:20 jan-schema-create.sql
-rw-r--r-- 1 tidb tidb 146 Jan 13 10:20 metadata

```

## snapshot参数case精讲  

```sql
MySQL [jan]> update mysql.tidb set VARIABLE_VALUE = '10m' where VARIABLE_NAME = 'tikv_gc_life_time';
Query OK, 1 row affected (0.02 sec)
Rows matched: 1  Changed: 1  Warnings: 0


MySQL [jan]> select * from t where t.id=7;
+----+-------+
| id | name  |
+----+-------+
|  7 | jan_7 |
+----+-------+
1 row in set (0.02 sec)

MySQL [jan]> SELECT FROM_UNIXTIME(unix_timestamp(now()), '%Y-%m-%d %H:%i:%S');
+-----------------------------------------------------------+
| FROM_UNIXTIME(unix_timestamp(now()), '%Y-%m-%d %H:%i:%S') |
+-----------------------------------------------------------+
| 2021-01-13 11:08:38                                       |
+-----------------------------------------------------------+
1 row in set (0.00 sec)

MySQL [jan]> update t set name='jan_test123' where id=7;
Query OK, 1 row affected (0.03 sec)
Rows matched: 1  Changed: 1  Warnings: 0

MySQL [jan]> select * from t where t.id=7;
+----+-------------+
| id | name        |
+----+-------------+
|  7 | jan_test123 |
+----+-------------+
1 row in set (0.01 sec)


[tidb@tiup-tidb41 dumpling_dir]$ tiup dumpling -u root -P 4000 --host 192.168.169.41 -o /home/tidb/dumpling_dir --database jan --tables-list "jan.t" --snapshot "2021-01-13 11:08:38"
Starting component `dumpling`: /home/tidb/.tiup/components/dumpling/v4.0.9/
......
......
[2021/01/13 11:09:03.444 -05:00] [INFO] [collector.go:212] ["backup Success summary: total backup ranges: 3, total success: 3, total failed: 0, total take(backup time): 133.798665ms, total take(real time): 133.903901ms, total rows: 7, total size(Byte): 143, avg speed(Byte/s): 1068.77"]
[2021/01/13 11:09:03.445 -05:00] [INFO] [main.go:78] ["dump data successfully, dumpling will exit now"]


MySQL [jan]> drop table t;

[tidb@tiup-tidb41 dumpling_dir]$ loader -d /home/tidb/dumpling_dir 
2021/01/13 11:28:56 printer.go:52: [info] Welcome to loader
......
......
2021/01/13 11:33:33 loader.go:791: [info] [loader] all data files has been finished, takes 93.948962 seconds
2021/01/13 11:33:33 main.go:88: [info] loader stopped and exits 

MySQL [jan]> select * from t where t.id=7;
+----+-------+
| id | name  |
+----+-------+
|  7 | jan_7 |
+----+-------+
1 row in set (0.01 sec)

MySQL [jan]> update mysql.tidb set VARIABLE_VALUE = '10m' where VARIABLE_NAME = 'tikv_gc_life_time';
Query OK, 1 row affected (0.02 sec)
Rows matched: 1  Changed: 1  Warnings: 0
```

### 常用案例

```sql
tiup dumpling -u root -P 4000 --host 9.16.4.172 -o /data/tidb-deploy/dump_dir --filetype=sql -T "uastest.risk_factor" -t 16 -p "..."

Starting component `dumpling`: /home/tidb/.tiup/components/dumpling/v4.0.8/dumpling -u root -P 4000 --host 9.16.4.172 -o /data/tidb-deploy/dump_dir --filetype=sql -T uastest.risk_factor -t 16 -p gsctidbtest2020
Release version: v4.0.8
Git commit hash: b84f64ff362cedcb795aa23fa1188ba7b7c9a7d7
Git branch:      heads/refs/tags/v4.0.8
Build timestamp: 2020-10-30 08:14:27Z
Go version:      go version go1.13 linux/amd64

[2021/04/08 01:34:24.657 +08:00] [INFO] [config.go:180] ["detect server type"] [type=TiDB]
[2021/04/08 01:34:24.657 +08:00] [INFO] [config.go:198] ["detect server version"] [version=4.0.8]
[2021/04/08 01:34:24.667 +08:00] [INFO] [client.go:148] ["[pd] create pd client with endpoints"] [pd-address="[9.1.179.15:2379]"]
[2021/04/08 01:34:24.669 +08:00] [INFO] [base_client.go:253] ["[pd] switch leader"] [new-leader=http://9.1.179.15:2379] [old-leader=]
[2021/04/08 01:34:24.669 +08:00] [INFO] [base_client.go:103] ["[pd] init cluster id"] [cluster-id=6909333068551768254]
[2021/04/08 01:34:26.433 +08:00] [WARN] [block_allow_list.go:15] ["unsupported dump schema in TiDB now"] [schema=PERFORMANCE_SCHEMA]
[2021/04/08 01:34:26.433 +08:00] [WARN] [block_allow_list.go:15] ["unsupported dump schema in TiDB now"] [schema=INFORMATION_SCHEMA]
[2021/04/08 01:34:26.433 +08:00] [WARN] [block_allow_list.go:15] ["unsupported dump schema in TiDB now"] [schema=METRICS_SCHEMA]
[2021/04/08 01:34:26.433 +08:00] [WARN] [block_allow_list.go:15] ["unsupported dump schema in TiDB now"] [schema=mysql]
[2021/04/08 02:08:08.901 +08:00] [INFO] [main.go:234] ["dump data successfully, dumpling will exit now"]
```
