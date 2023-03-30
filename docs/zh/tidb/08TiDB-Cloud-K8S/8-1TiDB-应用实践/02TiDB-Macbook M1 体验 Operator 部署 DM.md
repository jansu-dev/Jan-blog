# Macbook M1 体验 Operator 部署 DM

## 一、MySQL 配置

1. 寻找 mysql 配置，我选择 `/opt/homebrew/etc/my.cnf`，将 binlog 配置信息填入。
  
    ```shell
    jan@Jan-M1-Pro ~ % brew install mysql

    jan@Jan-M1-Pro Database % mysql --help --verbose | grep my.cnf
                          order of preference, my.cnf, $MYSQL_TCP_PORT,
    /etc/my.cnf /etc/mysql/my.cnf /opt/homebrew/etc/my.cnf ~/.my.cnf 

    vim /opt/homebrew/etc/my.cnf  

    [mysqld]
    ......
    log_bin = mysql-bin #开启binlog
    binlog_format = ROW #选择row模式
    server_id = 1

    sudo chown _mysql:_mysql /Users/jan/Database/k8s/data_tidb/mysql-binlog
    
    jan@Jan-M1-Pro ~ % brew services restart mysql
    
    jan@Jan-M1-Pro ~ % brew services list |grep mysql
    mysql         started         jan  ~/Library/LaunchAgents/homebrew.mxcl.mysql.plist
    ```

2. 开启 binlog 并配置单独路径

    ```sql
    mysql> show variables like '%log_bin%';
    +---------------------------------+------------------------------------------------------+
    | Variable_name                   | Value                                                |
    +---------------------------------+------------------------------------------------------+
    | log_bin                         | ON                                                   |
    | log_bin_basename                | /opt/homebrew/var/mysql/mysql-bin                    |
    | log_bin_index                   | /Users/jan/Database/k8s/data_tidb/mysql-binlog.index |
    | log_bin_trust_function_creators | OFF                                                  |
    | log_bin_use_v1_row_events       | OFF                                                  |
    | sql_log_bin                     | ON                                                   |
    +---------------------------------+------------------------------------------------------+
    
    mysql> show master status;
    +------------------+----------+--------------+------------------+-------------------+
    | File             | Position | Binlog_Do_DB | Binlog_Ignore_DB | Executed_Gtid_Set |
    +------------------+----------+--------------+------------------+-------------------+
    | mysql-bin.000008 |      157 |              |                  |                   |
    +------------------+----------+--------------+------------------+-------------------+
    1 row in set (0.01 sec)
    ```

## 二、通过 TiDB Operator 配置 DM

<https://github.com/pingcap/tidb-operator/pull/3528>

## 三、配置任务

```shell
mkdir conf & cd conf

vim source1.yaml

/conf # cat source1.yaml
# MySQL1 Configuration.

source-id: "mysql-replica-01"
enable-gtid: false
from:
  host: "host.docker.internal"
  user: "root"
  password: ""
  port: 3306

/conf # ../dmctl --master-addr jan-dm-dm-master-0:8261 operate-source create  source1.yaml
{
    "result": true,
    "msg": "",
    "sources": [
        {
            "result": true,
            "msg": "",
            "source": "mysql-replica-01",
            "worker": "jan-dm-dm-worker-0"
        }
    ]
}
```

## 四、配置任务

1. 准备 pv

    ```shell
    
    jan@Jan-M1-Pro tidb-config % vim tidb-dm-loader-pv.yaml
    apiVersion: v1
    kind: PersistentVolume
    metadata:
      name: dm-loader-dir
    spec:
      capacity:
        storage: 5Gi
      accessModes:
        - ReadWriteOnce
      persistentVolumeReclaimPolicy: Retain
      storageClassName: local-storage
      local:
        path: /Users/jan/Database/k8s/data_tidb/loader-mysql-dir
      nodeAffinity:
        required:
          nodeSelectorTerms:
          - matchExpressions:
            - key: kubernetes.io/hostname
              operator: In
              values:
              - localhost
    
    jan@Jan-M1-Pro tidb-config % kubectl apply -f tidb-dm-loader-pv.yaml
    
    jan@Jan-M1-Pro tidb-config % kubectl get pv |grep dm-loader-dir
    dm-loader-dir                              5Gi        RWO            Retain           Available                                               local-storag
    ```

## 五、造数据

```shell
jan@Jan-M1-Pro tidb-config % sysbench oltp_read_write --mysql-host=127.0.0.1 \
    --mysql-port=3306 --mysql-db=test \
    --mysql-user=root --mysql-password= \
    --table_size=5000 --tables=10  --events=10000 \
    --report-interval=10 prepare

Creating table 'sbtest1'...
Inserting 5000 records into 'sbtest1'
Creating a secondary index on 'sbtest1'...
...
...
Creating table 'sbtest10'...
Inserting 5000 records into 'sbtest10'
Creating a secondary index on 'sbtest10'...
```

## 导数据

从 `sbtest1-sbtest10` 单独在下游创建，否则会出现 COLLATE=utf8mb4_0900_ai_ci 不兼容问题。

```sql
/*!40101 SET NAMES binary*/;
CREATE TABLE `sbtest10` (
  `id` int NOT NULL AUTO_INCREMENT,
  `k` int NOT NULL DEFAULT '0',
  `c` char(120) NOT NULL DEFAULT '',
  `pad` char(60) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`),
  KEY `k_6` (`k`)
) ENGINE=InnoDB AUTO_INCREMENT=5001 DEFAULT CHARSET=utf8mb4;
```

```shell
jan@Jan-M1-Pro dump % pwd
/Users/jan/Desktop/dump

jan@Jan-M1-Pro dump % tiup dumpling -u root -P 3306 -h127.0.0.1 -o ./
......
[2023/03/20 03:32:31.688 +08:00] [INFO] [main.go:81] ["dump data successfully, dumpling will exit now"]
```

## 五、重启同步

```yaml
/conf # ../dmctl --master-addr jan-dm-dm-master-0:8261 start-task ./task.yaml --remove-meta
{
    "result": true,
    "msg": "",
    "sources": [
        {
            "result": true,
            "msg": "",
            "source": "mysql-replica-01",
            "worker": "jan-dm-dm-worker-0"
        }
    ],
    "checkResult": "fail to check synchronization configuration with type: no errors but some warnings
        detail: {
                "results": [
                        {
                                "id": 1,
                                "name": "mysql_version",
                                "desc": "check whether mysql version is satisfied",
                                "state": "warn",
                                "errors": [
                                        {
                                                "severity": "warn",
                                                "short_error": "version suggested earlier than 8.0.0 but got 8.0.32"
                                        }
                                ],
                                "instruction": "It is recommended that you select a database version that meets the requirements before performing data migration. Otherwise data inconsistency or task exceptions might occur.",
                                "extra": "address of db instance - host.docker.internal:3306"
                        },
                        {
                                "id": 9,
                                "name": "table structure compatibility check",
                                "desc": "check compatibility of table structure",
                                "state": "warn",
                                "errors": [
                                        {
                                                "severity": "warn",
                                                "short_error": "table `test`.`sbtest9` collation is not same, upstream: (sbtest9 utf8mb4_0900_ai_ci), downstream: (sbtest9 utf8mb4_bin)"
                                        },
                                        {
                                                "severity": "warn",
                                                "short_error": "table `test`.`sbtest5` collation is not same, upstream: (sbtest5 utf8mb4_0900_ai_ci), downstream: (sbtest5 utf8mb4_bin)"
                                        },
                                        {
                                                "severity": "warn",
                                                "short_error": "table `test`.`sbtest7` collation is not same, upstream: (sbtest7 utf8mb4_0900_ai_ci), downstream: (sbtest7 utf8mb4_bin)"
                                        },
                                        {
                                                "severity": "warn",
                                                "short_error": "table `test`.`sbtest3` collation is not same, upstream: (sbtest3 utf8mb4_0900_ai_ci), downstream: (sbtest3 utf8mb4_bin)"
                                        },
                                        {
                                                "severity": "warn",
                                                "short_error": "table `test`.`sbtest8` collation is not same, upstream: (sbtest8 utf8mb4_0900_ai_ci), downstream: (sbtest8 utf8mb4_bin)"
                                        },
                                        {
                                                "severity": "warn",
                                                "short_error": "table `test`.`sbtest10` collation is not same, upstream: (sbtest10 utf8mb4_0900_ai_ci), downstream: (sbtest10 utf8mb4_bin)"
                                        },
                                        {
                                                "severity": "warn",
                                                "short_error": "table `test`.`sbtest2` collation is not same, upstream: (sbtest2 utf8mb4_0900_ai_ci), downstream: (sbtest2 utf8mb4_bin)"
                                        },
                                        {
                                                "severity": "warn",
                                                "short_error": "table `test`.`sbtest6` collation is not same, upstream: (sbtest6 utf8mb4_0900_ai_ci), downstream: (sbtest6 utf8mb4_bin)"
                                        },
                                        {
                                                "severity": "warn",
                                                "short_error": "table `test`.`sbtest1` collation is not same, upstream: (sbtest1 utf8mb4_0900_ai_ci), downstream: (sbtest1 utf8mb4_bin)"
                                        }
                                ],
                                "instruction": "Ensure that you use the same collations for both upstream and downstream databases. Otherwise the query results from the two databases might be inconsistent.; "
                        }
                ],
                "summary": {
                        "passed": true,
                        "total": 10,
                        "successful": 8,
                        "failed": 0,
                        "warning": 2
                }
        }"
}
/conf # ../dmctl --master-addr jan-dm-dm-master-0:8261 query-status local-mysql-test
{
    "result": true,
    "msg": "",
    "sources": [
        {
            "result": true,
            "msg": "",
            "sourceStatus": {
                "source": "mysql-replica-01",
                "worker": "jan-dm-dm-worker-0",
                "result": null,
                "relayStatus": null
            },
            "subTaskStatus": [
                {
                    "name": "local-mysql-test",
                    "stage": "Running",
                    "unit": "Sync",
                    "result": null,
                    "unresolvedDDLLockID": "",
                    "sync": {
                        "totalEvents": "0",
                        "totalTps": "0",
                        "recentTps": "0",
                        "masterBinlog": "(mysql-bin.000009, 9552368)",
                        "masterBinlogGtid": "",
                        "syncerBinlog": "(mysql-bin.000009, 9552368)",
                        "syncerBinlogGtid": "",
                        "blockingDDLs": [
                        ],
                        "unresolvedGroups": [
                        ],
                        "synced": true,
                        "binlogType": "remote",
                        "secondsBehindMaster": "0",
                        "blockDDLOwner": "",
                        "conflictMsg": "",
                        "totalRows": "0",
                        "totalRps": "0",
                        "recentRps": "0"
                    },
                    "validation": null
                }
            ]
        }
    ]
}
```
