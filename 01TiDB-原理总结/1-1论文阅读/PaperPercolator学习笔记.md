# Percolator paper 学习笔记


## 论文摘要

Google 以往依靠离线计算的 “网页索引服务” 存在处理时延问题，当新的文档索引矩阵更新后，需要 MapReduce 和 Batch 批处理计算新的结果。使用 Percolator 组件替换基于 batch 离线处理体系，相同天处理文档量前提下，平均文档年龄降低 50%，主要原因便是 Percolator 的增量分布式事务处理模型。

![01](./PaperPercolator学习笔记/01.jpg)  


原有的 MapReduce 离线计算机制自动限制并发顺序，当切换到 Percolator 控制并发时，便涉及控制并发计算的结果正确性。经典例子：PageRank 算法优化 Google 网页索引重要性服务，出于简述原理目的便不赘述，详解可阅读 [知乎文章](https://zhuanlan.zhihu.com/p/197877312)。

![02](./PaperPercolator学习笔记/PageRank.svg)





## 参考文章

[Large-scale Incremental Processing
Using Distributed Transactions and Notifications](http://notes.stephenholiday.com/Percolator.pdf)