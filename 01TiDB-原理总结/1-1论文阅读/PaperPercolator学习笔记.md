# Percolator paper 学习笔记


## 论文摘要

Google 以往依靠离线计算的 “网页索引服务” 存在处理时延问题，当新的文档索引矩阵更新后，需要 MapReduce 和 Batch 批处理计算新的结果。使用 Percolator 组件替换基于 batch 离线处理体系，每天相同处理文档量前提下，平均文档年龄降低 50%，主要原因便是 Percolator 的增量分布式事务处理模型。

![03](./PaperPercolator学习笔记/01.jpg)  

Percolator 增量处理的优缺点：   
**优点：**  
1. 增量处理，用带 Timestamp Oracle 的类 Mvcc 机制实现版本隔离；
2. 高容量扩展，TSO 机制和延迟清锁机制，允许集群扩展至上千台机器；   

**缺点：**   
1. 延时要求低，缺乏全局死锁探测器和全局事务管理器，会增大事务冲突和延时。



## TSO 一致性设计

原有的 MapReduce 离线计算机制自动限制并发顺序，当切换到 Percolator 控制并发时，便涉及控制并发计算的结果正确性。经典例子：PageRank 算法优化 Google 网页索引重要性服务，出于简述原理目的便不赘述，详解可阅读 [知乎文章](https://zhuanlan.zhihu.com/p/197877312)。
1. 当爬虫爬取新的网页到存储库中，原离线模型使用 MapReduce 子任务不计算成功，总任务便无法汇总计算。  
2. 新增量处理模型 Percolator 便有了控制不同时间计算结果的需求，Percolator 需要版本控制特性确保数据计算正确。

![02](./PaperPercolator学习笔记/PageRank.svg)

Percolator 通过 ACID Transaction 、 observers 、timestamp oracle、lightweight lock 四个抽象解决上述问题  
1. Observers 链接用于扫描 Bigtable 的数据改变 (“notifications”) 的 Percolator worker；   
2. Observers 发起事务，发送读写 RPC 消息给 Bigtable tablet servers；   
3. Bigtable tablet servers 发送读写 RPC 消息给 GFS chunkservers；    
4. TSO（timestamp oracle） 提供严格的曾量时间戳，确保快照隔离一致性；   
5. Percolator Workers 使用 lightweight lock 使搜索被修改过的脏数据更高效。


![03](./PaperPercolator学习笔记/Percolator_architect.svg)  



## BigTable 概览

BigTable 是以 （row, column, timestamp） 元组为 key 存储的多维存储库，提供行级 lookup 和 update 的原子读写操作，以集群形式处理 PB 级数据量。

BigTable 处理流程简述：    
1. 






## 参考文章

[Large-scale Incremental Processing
Using Distributed Transactions and Notifications](http://notes.stephenholiday.com/Percolator.pdf)