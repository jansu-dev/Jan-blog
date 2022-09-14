# TiDB-Learning-Notes

![image.png](http://cdn.lifemini.cn/dbblog/20210123/5dae983117ea487aafc60162651b254d.png)

That the repository was build is aim to log process of mysql TiDB Learning.

<!-- TOC -->

- [TiDB-Learning-Notes](#tidb-learning-notes)
    - [01 TiDB-原理总结](#01-tidb-原理总结)
        - [1-1 论文阅读](#1-1-论文阅读)
        - [1-2 特性摘要](#1-2-特性摘要)
        - [1-3 组件原理](#1-3-组件原理)
        - [1-4 存储引擎](#1-4-存储引擎)
    - [02 TiDB-部署实践](#02-tidb-部署实践)
        - [2-1 软硬件环境监测](#2-1-软硬件环境监测)
        - [2-2 Ansible部署实践](#2-2-ansible部署实践)
        - [2-3 TiUP部署实践](#2-3-tiup部署实践)
    - [03 TiDB-运维管理](#03-tidb-运维管理)
        - [3-1 基础运维管理](#3-1-基础运维管理)
        - [3-2 常规备份恢复](#3-2-常规备份恢复)
        - [3-3 非常规恢复](#3-3-非常规恢复)
    - [04 TiDB-版本特性](#04-tidb-版本特性)
    - [05 TiDB-调优实践](#05-tidb-调优实践)
        - [5-1 监控信息](#5-1-监控信息)
        - [5-2 参数调优](#5-2-参数调优)
        - [5-3 SQL调优](#5-3-sql调优)
        - [5-4 生产案例](#5-4-生产案例)
        - [5-5 常见错误](#5-5-常见错误)
    - [06 TiDB-生态工具](#06-tidb-生态工具)
        - [6-1 Dumpling](#6-1-dumpling)
        - [6-2 TiDB-Lightning](#6-2-tidb-lightning)
        - [6-3 TiDB-Binlog](#6-3-tidb-binlog)
        - [6-4 DM](#6-4-dm)
        - [6-5 TiCDC](#6-5-ticdc)
        - [6-5 TiSpark](#6-5-tispark)
    - [07 TiDB-解决方案](#07-tidb-解决方案)
        - [7-1 TiDB-Binlog读写分离方案](#7-1-tidb-binlog读写分离方案)
        - [7-2 两地三中心高可用方案](#7-2-两地三中心高可用方案)
        - [7-3 迁移MyCat至TiDB方案](#7-3-迁移mycat至tidb方案)
        - [7-4 迁移Oracle至TiDB方案](#7-4-迁移oracle至tidb方案)
        - [7-5 Oracle 下迁 TiDB 或 MySQL 工具](#7-5-oracle-下迁-tidb-或-mysql-工具)
    - [08 TiDB-源码阅读](#08-tidb-源码阅读)

<!-- /TOC -->



## 01 TiDB-原理总结

### 1-1 论文阅读

[Paper Percolator 学习笔记](./01TiDB-原理总结/1-1论文阅读/Theory-Percolator分布式事务.md)    
[Paper Spanner 学习笔记](./01TiDB-原理总结/1-1论文阅读/Theory-Spanner分布式事务.md)    
[Paper Isolation Levels 学习笔记](./01TiDB-原理总结/1-1论文阅读/PaperIsolationLevels学习笔记.md)  
[Paper Paxos 学习笔记](./01TiDB-原理总结/1-1论文阅读/PaperPaxos学习笔记.md)  
[Paper LSM Tree 学习笔记](./01TiDB-原理总结/1-1论文阅读/Theory-LSMTree存储.md)

### 1-2 特性摘要

### 1-3 组件原理

### 1-4 存储引擎


## 02 TiDB-部署实践

### 2-1 软硬件环境监测
[TiDB 集群部署前环境检测](./02TIDB-部署实践/2-1软硬件环境检测/TiDB-集群部署前环境检测.md)

### 2-2 Ansible部署实践

[Ansible 工具介绍与 TiDB 集群部署](./02TIDB-部署实践/2-1Ansible部署实践/TiDB-Ansible部署工具简介与TiDB集群部署.md)  
[Ansible TiDB 集群扩缩容及注意事项](./02TIDB-部署实践/2-1Ansible部署实践/TiDB-Ansible部署工具简介与TiDB集群部署.md)   
 

### 2-3 TiUP部署实践  

[Tiup 工具原理与目录结构解析](./02TIDB-部署实践/2-1Ansible部署实践/TiDB-Ansible部署工具简介与TiDB集群部署.md)   
[Tiup 工具扩缩容及升级操作流程与注意事项](./02TIDB-部署实践/2-1Ansible部署实践/TiDB-Ansible部署工具简介与TiDB集群部署.md)  

## 03 TiDB-运维管理

### 3-1 基础运维管理

### 3-2 常规备份恢复

### 3-3 非常规恢复

## 04 TiDB-版本特性 

## 05 TiDB-调优实践

### 5-1 监控信息

### 5-2 参数调优 

### 5-3 SQL调优

### 5-4 生产案例  
[导入100万左右数据中断问题](./05TiDB-调优实践/5-4TiDB-生产案例/CASE-导入100万左右数据中断问题.md)  
[TiDB 热点问题识别与解决方案](./05TiDB-调优实践/5-4TiDB-生产案例/CASE-热点问题识别与解决方案.md)  
[磁盘抖动导致 Duration 抖动现象问题](./05TiDB-调优实践/5-4TiDB-生产案例/CASE-网卡带宽打满导致Duration升高问题.md)  
[网卡带宽打满导致 Duration 升高问题](./05TiDB-调优实践/5-4TiDB-生产案例/CASE-网卡带宽打满导致Duration升高问题.md)  
[非SSD磁盘性能引发 txnLockNotFound 问题](./05TiDB-调优实践/5-4TiDB-生产案例/CASE-非SSD磁盘性能引发txnLockNotFound问题.md)

### 5-5 常见错误


## 06 TiDB-生态工具

### 6-1 Dumpling

### 6-2 TiDB-Lightning
[TiDB-Lightning原理与使用](./06TiDB-生态工具/TiDB-Lightning原理与使用.md)  
[TIDB–不容易发现的 lightning tidb-backend 模式导入优化](06TiDB-生态工具/TIDB–不容易发现的lightning-tidb-backend模式导入优化.md)

### 6-3 TiDB-Binlog  

[Binlog及Reparo原理与使用](./06TiDB-生态工具/TiDB-Binlog及Reparo原理与使用.md)   

### 6-4 DM
[TiDB-BR工具原理简介与使用](./06TiDB-生态工具/TiDB-BR工具原理与使用.md)  
[TiDB-DM工具原理与使用](./06TiDB-生态工具/TiDB-DM工具原理与使用.md)  

### 6-5 TiCDC

[TiCDC-01-简述使用背景](./06TiDB-生态工具/TiCDC/TiCDC-01-简述使用背景.md)   
[TiCDC-02-剖析架构模型](./06TiDB-生态工具/TiCDC/TiCDC-02-剖析架构模型.md)   
[TiCDC-03-CDC组件解析](./06TiDB-生态工具/TiCDC/TiCDC-03-CDC组件解析.md)   
[TiCDC-04-监控原理解析](./06TiDB-生态工具/TiCDC/TiCDC-04-监控原理解析.md)   

### 6-5 TiSpark  
[TiDB-Spark工作原理](./06TiDB-生态工具/TiDB-TiSpark/TiDB-Spark工作原理.md)  

## 07 TiDB-解决方案

### 7-1 TiDB-Binlog读写分离方案

### 7-2 两地三中心高可用方案

[TiDB 容灾部署知识点归纳](./07TiDB-解决方案/两地三中心高可用方案/TiDB-容灾部署知识点归纳.md)

### 7-3 迁移MyCat至TiDB方案

[某 OLAP 为主 OLTP 为辅的 MyCAT 系统下迁 TiDB](./07TiDB-解决方案/迁移MyCat至TiDB方案/某系统OLAP为主OLTP为辅系统下迁TiDB.md)    
[TiChange Shell 脚本转换 csv 文件适配 tidb-lightning](./07TiDB-解决方案/迁移MyCat至TiDB方案/TiChange-Shell脚本转换csv文件适配tidb-lightning.md)

### 7-4 迁移Oracle至TiDB方案

[Oracle 到 TiDB 的 OGG 部署方案](./07TiDB-解决方案/迁移Oracle至TiDB方案/Oracle到TiDB的OGG部署方案.md)

### 7-5 Oracle 下迁 TiDB 或 MySQL 工具

## 08 TiDB-源码阅读
1. [TiDB 内核-源码解读 Point_Get 点查的一生](./08TiDB-源码阅读/TiDB/01-TiDB内核-源码解读Point_Get点查的一生.md)  
2. [TiDB-lightning 的 tidb_projection_concurrency 设置过大，较大高并发下是否会把 CPU 打满](https://asktug.com/t/topic/94978)