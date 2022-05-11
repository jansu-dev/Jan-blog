## 一、项目背景 

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;如 [PingCAP 官网](https://docs.pingcap.com/zh/tidb/stable/ticdc-overview) 所述，TiCDC 的使用场景主要有 **“数据库灾备”** 及 **“数据集成”**。熟悉 TiDB 周边生态的爱好者一定知道 **“TiDB Binlog”** 这一与 TiCDC 功能相似的工具，**那么为什么要重复工作呢？**     
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 答案是 “TiDB Binlog” 无法存在以下(非全部)种种问题，对于 “TiDB Binlog” 还不熟悉的伙伴参考 [TiDB Binlog 简介](https://docs.pingcap.com/zh/tidb/stable/tidb-binlog-overview)：   
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 1. “TiDB Binlog” 扩展性差，如：Drainer 存在 “单点” 及 “性能” 问题，拆分 Drainer 无法保证 “数据行变更有序性”；       
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 2. “TiDB Binlog” 性能低下，如：“TiDB Binlog” 仅支持单 kafka 单 partition 写入，无法提高 kafka 吞吐量；     
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 3. “TiDB Binlog” 通用型差，如：写成 binlog 写成文件需要使用 Reparo 解析 SQL 语句，不支持 Maxwell、Canal 等通用协议；   
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 4. “TiDB Binlog” 同步痛点，如：binlog 写到下游受 GRPC max message 限制多，如 [Pump 的 gRPC message 超过限值](https://docs.pingcap.com/zh/tidb/stable/handle-tidb-binlog-errors#%E5%BD%93%E4%B8%8A%E6%B8%B8%E4%BA%8B%E5%8A%A1%E8%BE%83%E5%A4%A7%E6%97%B6pump-%E6%8A%A5%E9%94%99-rpc-error-code--resourceexhausted-desc--trying-to-send-message-larger-than-max-2191430008-vs-2147483647) 等等；  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 4. “TiDB Binlog” 可用性差，如：单点的 Drainer 一旦出现问题同步将中断，不存在自愈功能；

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 由此 TiCDC 应运而生，通过直接捕获 TiKV Change Log ，将表作为拆分单元调度至各 Capture 中，并发向下游同步数据解决扩展性问题。可 kafka 多 partition 写入，并支持 Maxwell、Canal 等多种通用协议，解决同步性能、生态通用性问题。当同步超时、 Capture 同步表数量不均、Capture 挂掉等情况时，TiCDC 存在调度机制及 At Least Once 保证数据完整性前提下，调度实现自愈合。   

![01BinlogAndTiCDC](./CDC-01-简述背景架构/01BinlogAndTiCDC.png)


## 二、工具位置   

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;首先，熟知 TiCDC 使用方法，必先明确其在 TiDB 生态工具所处的位置及作用。     
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **1. 作用而言**：数据库如果是个只进不出的 **“貔貅”**，那么必将被市场所抛弃，也就是所谓的 **“数据孤岛”**，TiCDC  兼顾同步性能、数据完整性，一致性、生态通用性，实现了数据从 **"流入-> TiDB ->流出"** 的闭环。此外，谈性能如果抛弃了场景（不深入讨论），那就是在耍流氓，没有任何一个款产品能完胜所有场景，TiDB 同样也有自己的舒适区、痛点区。**有了 TiCDC 之后，用户可以轻松实现数据的流转，把 TiDB 用在使用场景的舒适区。**   
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **2. 位置而言**：TiCDC 介于 TiDB 与下游目的端之间，下游包含兼用 MySQL 通许协议的所有产品、平台（如：TiDB、MySQL、RDS、三方云平台等）。用户可基于通用消息队列输出协议自定义开发，现 TiCDC 支持的协议有：Open Protocol 、Canal-JSON 、 Canal 、Avro 、 Maxwell 等协议，有些协议仅部分支持，详情参考 --> [TiCDC 支持的消息队列输出协议指南](https://github.com/pingcap/tiflow/blob/master/docs/design/2020-11-04-ticdc-protocol-list.md#protocols-%E5%88%86%E5%8D%8F%E8%AE%AE%E4%BB%8B%E7%BB%8D)      
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 其次，TiCDC 几乎囊括所有主流 “数据同步” 的使用场景，下图便是 “MySQL --> TiDB --> Others” 的经典组合拳。至于其他协议的数据库（Oracle、PG）如何流入 TiDB，等同于如何流入 MySQL，因为 TiDB 兼容 MySQL 通讯协议，一定存在较成熟的解决方案。  

![02UpstreamAndDownstream](./CDC-01-简述背景架构/02UpstreamAndDownstream.png)



## 三、使用情况 

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**注意：下述公司均通过 AskTUG 搜索相关文章得到，即：分享文章中有提及该公司正在使用 TICDC。下述公司仅是通过搜索手段可得知的公司，还有许多商业客户要求不对外透露、或还未来得及透露。**  

### **3.1 小红书**

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;从 `张亿皓老师` 在 [【PingCAP Infra Meetup】No.131 TiCDC 的生态和社区建设](https://www.bilibili.com/video/BV1bD4y1o7qU?spm_id_from=333.337.search-card.all.click)  中分享可知，小红书基于 TiCDC 在业务中进行内容审核、笔记标签推荐、增长审计。实现如下图，基于 "TiDB --> TiCDC --> Kafka --> Flink --> TiDB" 这样一条链路实现与架构中其他数据源的聚合计算。        

![03xiaohongshu_share](./CDC-01-简述背景架构/03xiaohongshu_share.jpeg)

### **3.2 海尔智家**

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;从 `姚翔老师` 在 [【PingCAP Infra Meetup】No.131 TiCDC 的生态和社区建设](https://www.bilibili.com/video/BV1bD4y1o7qU?spm_id_from=333.337.search-card.all.click)  中分享可知，海尔智家基于 TICDC 在业务中进行搜索、推荐。将用户数据、生活家信息数据基于 "TiDB --> TiCDC --> Kafka --> ES" 这样一条链路实现 Kafka 日消费量在 300 万左右的近实时搜索功能。从描述中可知截止 2019-09-19 分享时，**TiCDC 在不涉及表数量、LOB 字段、网络延时等细节情况下，同步能力边界为：正常同步在 “毫秒” 级，抖动情况下在 “秒级”（10s 以内）。**   
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;此外，从 [Github -- Question and Bug Reports](https://github.com/pingcap/tiflow/projects/13) 中 TiCDC 存在 `mqSink flushes data synchronously,casing low performance`、`Poor incremental scan performance where they are frequent insertions`、`improve performance of syncer ` 等多个提升同步性能的 RoadMap。      

![04haierzhijia_share](./CDC-01-简述背景架构/04haierzhijia_share.jpeg)



### **3.3 360**

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;从 ` 代晓磊老师` 在 [BLOG - TiCDC 应用场景解析](https://tidb.net/blog/2fa9cf6a) 中分享可知，360 基于 TiCDC 实现并参与 **增量数据抽取需求、同城双集群热备、流处理需求** 的立项。  




   



## 四、使用方法

### 4.1 部署 TiCDC 

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;下述测试环境搭建 TiCDC 同步，目的测试、学习 TiCDC 同步功能。`172.16.6.155:8300` 及 `172.16.6.196:8300` 的 CDC 组件会在扩容后出现。   

```shell
[tidb@Linux-Hostname ~]$ tiup cluster display tidb-test

ID                  Role          Host          Ports        OS/Arch       Status  Data Dir                                     Deploy Dir
--                  ----          ----          -----        -------       ------  --------                                     ----------
172.16.6.155:9093   alertmanager  172.16.6.155  9093/9094    linux/x86_64  Up      /home/data/tidb-home/data/alertmanager-9093  /home/data/tidb-deploy/alertmanager-9093
172.16.6.155:8300   cdc           172.16.6.155  8300         linux/x86_64  Up      /data/deploy/install/data/cdc-8300           /home/data/tidb-deploy/cdc-8300
172.16.6.196:8300   cdc           172.16.6.196  8300         linux/x86_64  Up      /data/deploy/install/data/cdc-8300           /home/data/tidb-deploy/cdc-8300
172.16.6.155:3000   grafana       172.16.6.155  3000         linux/x86_64  Up      -                                            /home/data/tidb-deploy/grafana-3000
172.16.6.155:2379   pd            172.16.6.155  2379/2380    linux/x86_64  Up|UI   /home/data/tidb-home/data/pd-2379            /home/data/tidb-deploy/pd-2379
172.16.6.194:2379   pd            172.16.6.194  2379/2380    linux/x86_64  Up      /home/data/tidb-home/data/pd-2379            /home/data/tidb-deploy/pd-2379
172.16.6.196:2379   pd            172.16.6.196  2379/2380    linux/x86_64  Up|L    /home/data/tidb-home/data/pd-2379            /home/data/tidb-deploy/pd-2379
172.16.6.155:9090   prometheus    172.16.6.155  9090/12020   linux/x86_64  Up      /home/data/tidb-home/data/prometheus-9090    /home/data/tidb-deploy/prometheus-9090
172.16.6.155:4000   tidb          172.16.6.155  4000/10080   linux/x86_64  Up      -                                            /home/data/tidb-deploy/tidb-4000
172.16.6.196:4000   tidb          172.16.6.196  4000/10080   linux/x86_64  Up      -                                            /home/data/tidb-deploy/tidb-4000
172.16.6.155:20160  tikv          172.16.6.155  20160/20180  linux/x86_64  Up      /home/data/tidb-home/data/tikv-20160         /home/data/tidb-deploy/tikv-20160
172.16.6.194:20160  tikv          172.16.6.194  20160/20180  linux/x86_64  Up      /home/data/tidb-home/data/tikv-20160         /home/data/tidb-deploy/tikv-20160
172.16.6.196:20160  tikv          172.16.6.196  20160/20180  linux/x86_64  Up      /home/data/tidb-home/data/tikv-20160         /home/data/tidb-deploy/tikv-20160
```

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**TiCDC 在 4.0.6 版本已经 GA，建议使用 4.0.6 及以后的版本**，详情参考 --> [TiCDC 官方文档](https://docs.pingcap.com/zh/tidb/stable/scale-tidb-using-tiup#%E6%89%A9%E5%AE%B9-ticdc-%E8%8A%82%E7%82%B9)，扩容步骤如下。   

```shell
[tidb@Linux-Hostname ~]$ cat scale-out-cdc.yaml 
cdc_servers:
  - host: 172.16.6.155
    gc-ttl: 86400
    data_dir: /data/deploy/install/data/cdc-8300
  - host: 172.16.6.196
    gc-ttl: 86400
    data_dir: /data/deploy/install/data/cdc-8300

[tidb@Linux-Hostname ~]$ tiup cluster scale-out tidb-test scale-out-cdc.yaml
```





### 4.2 同步至 Kafka



### 4.3 同步至 MySQL

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;在 `172.16.6.155:3306` 本地装个 MySQL，指定相关参数后便可创建订阅任务，id 为 simple-replication-task，在 Grafana 监控面板中可观察到同步进度。  

```shell
[tidb@Linux-Hostname ~]$ tiup cdc cli changefeed create --pd=http://172.16.6.155:2379 \
  --sink-uri="mysql://jan:123123@172.16.6.155:3306/?time-zone=&worker-count=16&max-txn-row=5000" \
  --changefeed-id="simple-replication-task" \
  --sort-engine="unified" \
  --config=changefeed.toml 

tiup is checking updates for component cdc ...
Starting component `cdc`: /home/tidb/.tiup/components/cdc/v6.0.0/cdc /home/tidb/.tiup/components/cdc/v6.0.0/cdc cli changefeed create --pd=http://172.16.6.155:2379 --sink-uri=mysql://jan:123123@172.16.6.155:3306/?time-zone=&worker-count=16&max-txn-row=5000 --changefeed-id=simple-replication-task --sort-engine=unified --config=changefeed.toml
[2022/04/12 16:58:40.954 +08:00] [WARN] [mysql_params.go:143] ["max-txn-row too large"] [original=5000] [override=2048]
Create changefeed successfully!
ID: simple-replication-task
Info: {"sink-uri":"mysql://jan:123123@172.16.6.155:3306/?time-zone=\u0026worker-count=16\u0026max-txn-row=5000","opts":{"_changefeed_id":"sink-verify"},"create-time":"2022-04-12T16:58:40.954474699+08:00","start-ts":432473091836215297,"target-ts":0,"admin-job-type":0,"sort-engine":"unified","sort-dir":"","config":{"case-sensitive":true,"enable-old-value":true,"force-replicate":false,"check-gc-safe-point":true,"filter":{"rules":["*.*"],"ignore-txn-start-ts":null},"mounter":{"worker-num":16},"sink":{"dispatchers":[{"matcher":["test.*"],"dispatcher":"ts","topic":""}],"protocol":"","column-selectors":null},"cyclic-replication":{"enable":false,"replica-id":0,"filter-replica-ids":null,"id-buckets":0,"sync-ddl":false},"scheduler":{"type":"table-number","polling-time":-1},"consistent":{"level":"none","max-log-size":64,"flush-interval":1000,"storage":""}},"state":"normal","error":null,"sync-point-enabled":false,"sync-point-interval":600000000000,"creator-version":"v6.0.0"}
```



## 五、引用文章  


[【PingCAP Infra Meetup】No.131 Why and how we build TiCDC](https://www.bilibili.com/video/BV1HT4y1A7mh?spm_id_from=333.337.search-card.all.click)   
[【PingCAP Infra Meetup】No.131 TiCDC 的生态和社区建设](https://www.bilibili.com/video/BV1bD4y1o7qU?spm_id_from=333.337.search-card.all.click)   
