# TiDB-Binglog 同步 TiDB 数据至 MySQL 方案

<!-- TOC -->

- [TiDB-Binglog 同步 TiDB 数据至 MySQL 方案](#tidb-binglog-同步-tidb-数据至-mysql-方案)
    - [TiDB-Binlog 部署](#tidb-binlog-部署)
        - [扩容拓扑文件准备](#扩容拓扑文件准备)
        - [扩容部署](#扩容部署)
        - [组件状态检查](#组件状态检查)
    - [TiDB-Binlog 链路验证](#tidb-binlog-链路验证)
        - [开启同步功能](#开启同步功能)
        - [增量功能验证](#增量功能验证)
        - [验证信息清理](#验证信息清理)
    - [MySQL 数据全量初始化](#mysql-数据全量初始化)
        - [基于 tso dumpling 全量导出](#基于-tso-dumpling-全量导出)
        - [基于 loader 全量导入](#基于-loader-全量导入)
        - [基于 sync-diff 全量验证](#基于-sync-diff-全量验证)
    - [TIDB-Binglog 增量同步](#tidb-binglog-增量同步)
        - [修改配置文件](#修改配置文件)

<!-- /TOC -->



## TiDB-Binlog 部署

### 扩容拓扑文件准备
```shell
vim binglog-scale-out.yaml

pump_servers:
  - host: 192.168.169.41
    ssh_port: 22
    port: 8250
    deploy_dir: "/data/tidb-deploy/pump-8250"
    data_dir: "/data/tidb-data/pump-8250"
    log_dir: "/data/tidb-deploy/pump-8250/log"
    numa_node: "0"
    # The following configs are used to overwrite the `server_configs.drainer` values.
    config:
      gc: 7
  - host: 192.168.169.42
    ssh_port: 22
    port: 8250
    deploy_dir: "/data/tidb-deploy/pump-8250"
    data_dir: "/data/tidb-data/pump-8250"
    log_dir: "/data/tidb-deploy/pump-8250/log"
    numa_node: "0"
  - host: 192.168.169.43
    ssh_port: 22
    port: 8250
    deploy_dir: "/data/tidb-deploy/pump-8250"
    data_dir: "/data/tidb-data/pump-8250"
    log_dir: "/data/tidb-deploy/pump-8250/log"
    numa_node: "0"

drainer_servers:
  - host: 192.168.169.44
    port: 8249
    data_dir: "/data/tidb-data/drainer-8249"
    # If drainer doesn't have a checkpoint, use initial commitTS as the initial checkpoint.
    # Will get a latest timestamp from pd if commit_ts is set to -1 (the default value).
    commit_ts: -1
    deploy_dir: "/data/tidb-deploy/drainer-8249"
    log_dir: "/data/tidb-deploy/drainer-8249/log"
    numa_node: "0"
#     # The following configs are used to overwrite the `server_configs.drainer` values.
    config:
      syncer.db-type: "mysql"
      syncer.to.host: "192.168.169.45"
      syncer.to.user: "root"
      syncer.to.password: "123123"
      syncer.to.port: 3306
```

### 扩容部署  

```shell
[tidb@tiup-tidb41 pump]$ tiup cluster scale-out tidb-test binglog-scale-out.yaml --wait-timeout 10000000

Starting component `cluster`: /home/tidb/.tiup/components/cluster/v1.3.1/tiup-cluster scale-out tidb-test binglog-scale-out.yaml --wait-timeout 10000000
......
......
Scaled cluster `tidb-test` out successfully
```
### 组件状态检查

```shell
MySQL [(none)]> show pump status;
+---------------------+---------------------+--------+--------------------+---------------------+
| NodeID              | Address             | State  | Max_Commit_Ts      | Update_Time         |
+---------------------+---------------------+--------+--------------------+---------------------+
| 192.168.169.41:8250 | 192.168.169.41:8250 | online | 422310029132038145 | 2021-01-18 10:48:33 |
| 192.168.169.42:8250 | 192.168.169.42:8250 | online | 422310029105561601 | 2021-01-18 10:48:33 |
| 192.168.169.43:8250 | 192.168.169.43:8250 | online | 422310028725452801 | 2021-01-18 10:48:33 |
+---------------------+---------------------+--------+--------------------+---------------------+


MySQL [(none)]> show drainer status;
+---------------------+---------------------+--------+--------------------+---------------------+
| NodeID              | Address             | State  | Max_Commit_Ts      | Update_Time         |
+---------------------+---------------------+--------+--------------------+---------------------+
| 192.168.169.44:8249 | 192.168.169.44:8249 | online | 422310030704640001 | 2021-01-18 10:48:44 |
+---------------------+---------------------+--------+--------------------+---------------------+

```


## TiDB-Binlog 链路验证



### 开启同步功能

```shell
MySQL [(none)]> show variables like "log_bin";
+---------------+-------+
| Variable_name | Value |
+---------------+-------+
| log_bin       | 0     |
+---------------+-------+


[tidb@tiup-tidb41 ~]$ tiup cluster edit-config tidb-test
......
......
server_configs:
  tidb:
    binlog.enable: true
    binlog.ignore-error: true
......
......


[tidb@tiup-tidb41 ~]$ tiup cluster reload tidb-test -R tidb
Starting component `cluster`: /home/tidb/.tiup/components/cluster/v1.3.1/tiup-cluster reload tidb-test -R tidb
......
......
Reloaded cluster `tidb-test` successfully


MySQL [(none)]> show variables like "log_bin";
+---------------+-------+
| Variable_name | Value |
+---------------+-------+
| log_bin       | 1     |
+---------------+-------+

```

### 增量功能验证

```
# 上游 TiDB 端检查
MySQL [(none)]> create database test234;

MySQL [(none)]> show databases;
+--------------------+
| Database           |
+--------------------+
| test234            |
+--------------------+

MySQL [test234]> insert into t values(1,'t_1');

MySQL [test234]> select * from t;
+----+------+
| id | name |
+----+------+
|  1 | t_1  |
+----+------+

# 下游 MySQL 端检查
mysql> show databases;
+--------------------+
| Database           |
+--------------------+
| test234            |
+--------------------+


mysql> select * from test234.t;
+----+------+
| id | name |
+----+------+
|  1 | t_1  |
+----+------+
```
### 验证信息清理

```shell
# 上游验证数据库清理
MySQL [(none)]> drop database test234;

MySQL [(none)]> show database;

# 下游数据库清理检查
mysql> show databases;
```

## MySQL 数据全量初始化

### 基于 tso dumpling 全量导出

**注意**：
1. 导出盘选 SSD 

```shell
# 使用 tiup 工具下载 dumpling 
[tidb@tiup-tidb41 ~]$ tiup install dumpling

# 启动 dumpling 导出表全量数据
[tidb@tiup-tidb41 ~]$ tiup -uroot -P4000 \
        --host=192.168.169.41 \
        -o /home/tidb/dumpling_tables/ \
        -r 200000 -F 256Mib \
        -L /home/tidb/dumpling_tables.log
```

检查日志是否正常

```shell

```

### 基于 loader 全量导入



1. loader 倒入时出现 duplicate key 解决办法

### 基于 sync-diff 全量验证



## TIDB-Binglog 增量同步


### 修改配置文件

