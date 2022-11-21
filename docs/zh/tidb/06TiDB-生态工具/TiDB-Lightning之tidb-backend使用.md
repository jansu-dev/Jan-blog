



## 下载部署

 - [TiDB-官方下载地址：https://docs.pingcap.com/zh/tidb/stable/download-ecosystem-tools#tidb-lightning](https://docs.pingcap.com/zh/tidb/stable/download-ecosystem-tools#tidb-lightning)

 - wget下载
   ```
   [tidb@tiup-tidb41 ~]$ wget https://download.pingcap.org/   tidb-toolkit-v4.0.9-linux-amd64.tar.gz
   ```





## 常用toml

```yaml
[lightning]
# 日志
level = "info"
file = "tidb-lightning.log"
max-size = 128 # MB
max-days = 28
max-backups = 14
# 服务器模式
status-addr = ':8289'
server-mode = true

index-concurrency = 8
table-concurrency = 16
io-concurrency = 5

[tikv-importer]
backend = "tidb"
#sorted-kv-dir = "/mnt/ssd/sorted-kv-dir"

[checkpoint]
enable = true
schema = "visadb_tidb_lightning_checkpoint"
driver = "file"

[mydumper]
data-source-dir = "/data/tidb-deploy/dump_dir"

[tidb]
# 目标集群的信息
host = "9.16.4.172"
port = 4000
user = "root"
password = ""
status-port = 10080
pd-addr = "9.1.179.15:2379"
# 设置 TiDB 库的日志等级。
log-level = "error"

# 设置 TiDB 会话变量，提升 Checksum 和 Analyze 的速度。
build-stats-concurrency = 20
distsql-scan-concurrency = 100
index-serial-scan-concurrency = 20
checksum-table-concurrency = 16

# 解析和执行 SQL 语句的默认 SQL 模式。
sql-mode = "ONLY_FULL_GROUP_BY,NO_ENGINE_SUBSTITUTION"

# `max-allowed-packet` 设置数据库连接允许的最大数据包大小，
# 对应于系统参数中的 `max_allowed_packet`。 如果设置为 0，
# 会使用下游数据库 global 级别的 `max_allowed_packet`。
max-allowed-packet = 67_108_864

[[routes]]
schema-pattern = "visadbtest"
target-schema = "visadb_upgradetest"
```