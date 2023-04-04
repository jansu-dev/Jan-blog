# DM架构概述

## DM 是什么

如果你第一次看到我的文档，我想你已经熟悉DM了。没有这些，我想大家可以看看 [DM官网](https://docs.pingcap.com/zh/tidb/stable/dm-arch)。

正如我们可以看到下面的架构，简而言之，它用来不断地将数据从 MySQL 单实例或分片 MySQL 集群迁移到 TiDB 集群。DM-worker与MySQL实例的数量是1比1的关系，DM实际上所做的是读取MySQL binlog，并在TiDB集群的复制过程中将它们全部转换为DML(插入、更新、删除类型)和DDL查询。

![体系结构](https://download.pingcap.com/images/docs-cn/dm/dm-architecture-2.0.png)

## 这些页面的目的

1. 在 “Master”，“Worker”，“Syncer” 和 “SourceWorker” 的基础上，我想简单介绍一下DM。所以，在读完它们之后，你可以知道 DM 是如何工作的，每个关键组件的含义和职责。

2. 对于 “Metrics” 一页，当生产环境中出现严重错误或出错时，它似乎更有用。这包括每一个指标的介绍，它们是如何计算的，以及何时触发它们进行计算。
