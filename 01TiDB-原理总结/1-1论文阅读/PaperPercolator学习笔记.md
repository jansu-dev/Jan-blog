# Percolator paper 学习笔记


## 论文摘要

Google 以往依靠离线计算的 “网页索引服务” 存在处理时延问题，当新的文档索引矩阵更新后，需要 MapReduce 和 Batch 批处理计算新的结果。使用 Percolator 组件替换基于 batch 离线处理体系，每天相同处理文档量前提下，平均文档年龄降低 50%，主要原因便是 Percolator 的增量分布式事务处理模型。

![03](./PaperPercolator学习笔记/01.jpg)  

原有的 MapReduce 离线计算机制自动限制并发顺序，当切换到 Percolator 控制并发时，便涉及控制并发计算的结果正确性。经典例子：PageRank 算法优化 Google 网页索引重要性服务，出于简述原理目的便不赘述，详解可阅读 [知乎文章](https://zhuanlan.zhihu.com/p/197877312)。
1. 当爬虫爬取新的网页到存储库中，原离线模型使用 MapReduce 子任务不计算成功，总任务便无法汇总计算。  
2. 新增量处理模型 Percolator 便有了控制不同时间计算结果的需求，因为 Percolator 需要 MapReduce 天生具有的版本控制特性，

![02](./PaperPercolator学习笔记/PageRank.svg)

Percolator 优点：
1. 增量处理，用带 Timestamp Oracle 的类 Mvcc 机制实现版本隔离；
2. 高容量扩展，延迟清锁机制，允许集群扩展至上千台机器；
3. 延时要求低，缺乏全局死锁探测器和全局事务管理器，会增大事务冲突和延时。


## BigTable 概览

BigTable 是以 row, column, timestamp 为元祖 key 存储的多维存储库，提供行级 lookup 和 update 的原子读写操作，以集群形式处理 PB 级数据量。
users: keys are () tuples

![03](./PaperPercolator学习笔记/Percolator_architect.svg)  




## 参考文章

[Large-scale Incremental Processing
Using Distributed Transactions and Notifications](http://notes.stephenholiday.com/Percolator.pdf)