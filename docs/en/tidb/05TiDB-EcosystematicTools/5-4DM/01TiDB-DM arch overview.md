# DM Architecture Overview

## What's DM

I think you are already familiar with DM if find out my doc first time. Without that, I think you can take a look at the [DM offical website](https://docs.pingcap.com/zh/tidb/stable/dm-arch).

As we can see the architecture below, in short, it used to countinuously migrate date from MySQL single instance or sharding MySQL cluster into TiDB Cluster. And DM-worker has a  1  to 1 relationship to the number of MySQL instance, what DM actually does is reading the MySQL binlog and transfering all of them into DML(types of insert, update, delete) and DDL queries at the journey of replication in TiDB Cluster.

![architecture](https://download.pingcap.com/images/docs-cn/dm/dm-architecture-2.0.png)

## the purpose of these pages

1. Based on pages of `Master`, `Worker`, `Syncer` and `SourceWorker`, I wanna give a brief introduction for DM. So, after reading all of them, you could know how DM works and what each critical component means and are responsible for.

2. For the page of `Metrics`, It seems to be more useful when a critical bug happens or something goes wrong in a production environment. Which includes every introduction of metrics, how they are calculated and when they are triggered to do the calculation.
