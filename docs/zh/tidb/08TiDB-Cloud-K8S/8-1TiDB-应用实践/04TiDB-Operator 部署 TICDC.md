# Macbook M1 体验 Operator 部署 TICDC

```shell
jan@Jan-M1-Pro tidb-config % cat mysql.yaml
apiVersion: v1
kind: PersistentVolumeClaim
apiVersion: v1
metadata:
  name: ticdc-to-mysql-pvc
  namespace: tidb-cluster
spec:
  accessModes:
    - ReadWriteMany
  resources:
    requests:
      storage: 5Gi
---
apiVersion: v1
kind: Service
metadata:
  name: ticdc-to-mysql-svc
  namespace: tidb-cluster
spec:
  ports:
  - name: mysql
    port: 3306
    targetPort: 3306
  selector:
    app: mysql
  clusterIP: None

---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: ticdc-to-mysql-deploy
  namespace: tidb-cluster
spec:
  replicas: 1
  selector:
    matchLabels:
      app: mysql
  template:
    metadata:
      labels:
        app: mysql
    spec:
      containers:
        - name: mysql
          image: mysql:8.0
          imagePullPolicy: IfNotPresent
          env:
          - name: MYSQL_ROOT_PASSWORD
            value: "123123"
          ports:
            - containerPort: 3306
          volumeMounts:
            - name: mysql-pvc
              mountPath: /var/lib/mysql
      volumes:
        - name: mysql-pvc
          persistentVolumeClaim:
            claimName: ticdc-to-mysql-pvc
```

## 创建任务

```shell

/ # cat config/changefeed-test.toml
[filter]
rules = ['test.*']

/ # /cdc cli changefeed create --server=http://basic-ticdc-0.basic-ticdc-peer.tidb-cluster.svc:8301 --sink-uri="mysql://root:123123@ticdc-to-mysql-svc:3307/" --changefeed-id="jan
-task"
Create changefeed successfully!
ID: jan-task
Info: {"upstream_id":7211019554206462790,"namespace":"default","id":"jan-task","sink_uri":"mysql://root:xxxxx@ticdc-to-mysql-svc:3307/","create_time":"2023-03-23T05:00:06.050107131Z","start_ts":440283327592660995,"engine":"unified","config":{"case_sensitive":true,"enable_old_value":true,"force_replicate":false,"ignore_ineligible_table":false,"check_gc_safe_point":true,"enable_sync_point":false,"bdr_mode":false,"sync_point_interval":600000000000,"sync_point_retention":86400000000000,"filter":{"rules":["*.*"],"event_filters":null},"mounter":{"worker_num":16},"sink":{"protocol":"","schema_registry":"","csv":{"delimiter":",","quote":"\"","null":"\\N","include_commit_ts":false},"column_selectors":null,"transaction_atomicity":"none","encoder_concurrency":16,"terminator":"\r\n","date_separator":"none","enable_partition_separator":false},"consistent":{"level":"none","max_log_size":64,"flush_interval":2000,"storage":""}},"state":"normal","creator_version":"v6.5.0"}
/ # ps -ef|grep cdc
    1 root      3h36 /cdc server --addr=0.0.0.0:8301 --advertise-addr=basic-ticdc-0.basic-ticdc-peer.tidb-cluster.svc:8301 --gc-ttl=86400 --log-file= --log-level=info --pd=http://basic-pd:2379
   91 root      0:00 grep cdc
```

## 销毁 TiCDC

1. 删除同步任务

    ```shell
    jan@Jan-M1-Pro tidb-config % kubectl exec -it basic-ticdc-0 -n tidb-cluster -- sh

    / # /cdc cli changefeed remove --server=http://basic-ticdc-0.basic-ticdc-peer.tidb-cluster.svc:8301 --changefeed-id="jan-task"
    ```

2. 删除 TiCDC pod

    ```shell
      jan@Jan-M1-Pro tidb-config % kubectl edit tc -n tidb-cluster
      ......
      ticdc:
        baseImage: pingcap/ticdc
        replicas: 0
      ......

    jan@Jan-M1-Pro tidb-config % kubectl get pod -A |grep ticdc
    ```
