# TiDB-架构原理总体摘要

## summary
> - [整体架构与特性场景](整体架构与特性场景)
> - [分裂与水平扩展](#分裂与水平扩展)  
>   - [regin分裂过程](#regin分裂过程)  
>   - [水平扩展实现过程](#水平扩展实现过程)  
> - [事务模型](#事务模型)  
>   - [Percolators](#Percolators)  
>   - [去中心化的2PC实现](#去中心化的2PC实现)  
> - [SQL引擎](#SQL引擎)  
>   - [关系模型](#关系模型)  
>   - [一致索引](#一致索引)  
>   - [完善SQL功能](#完善SQL功能)  
>   - [HTAP(OLTP、OLAP)](#HTAP(OLTP、OLAP))  



## 整体架构与特性场景

## TiKV分层架构


![5e721f8034edfca1e4e32f774f6e62d.png](http://cdn.lifemini.cn/dbblog/20210106/b7b42a2b12aa451bbd693ca112fa941d.png)

TiKV是一个分布式key-value存储引擎，内部采用嵌入式数据库rocksdb编程改良实现。  
rocksdb数据库是经由Facebook改良后的levelDB键值数据库，有良好的batch write、compation、多个memTab、LSM-Tree存储结构等特性。  

TiKV设计的优点：
 - 高度分层优点：有利于单独对某层次进行组件优化、有利于在开发时及时替换某层组件（如：使用mock组件进行测试）
 - raft机制：TiKV内部通过实现raft协议保证多store下的数据一致性，raft协议有paxos改良而来，通过节点选主后**主节点上**进行读写操作并记录**日志**，由follower节点来追赶主节点的日志实现多store节点数据的一致性。并且，自身由于协议本身acceptor仅接收最大proposal number的特性，在重新选主后仍能提供高可用的、一致性的服务。
 - 不依赖分布式文件系统优点：有利于降低整个系统的延时。设想，如果tikv依赖分布式文件系统，那么数据在将要落盘时的操作将经历，向master节点请求storage node存储节点的位置信息，与storage node节点交互并将数据写入操作，而采用本地文件系统则可以避免分布式文件系统在I/O时的网络请求。加之TiKV配备**M.2 NVMe协议**的SSD固态硬盘，将极大提高本地文件系统I/O性能，减少时延。

## 分裂与水平扩展

#### regin分裂过程  

#### 水平扩展实现过程

## 事务模型

#### Percolators

#### 去中心化的2PC实现


## SQL引擎

#### 关系模型

#### 一致索引


#### 完善SQL功能


#### HTAP(OLTP、OLAP)















## 参考文章