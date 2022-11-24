

## 文章意义


## 阅读前言
1. 如 [TiDB 官网所述其监控使用 Prometheus 存储](https://docs.pingcap.com/zh/tidb/stable/tidb-monitoring-framework#prometheus-%E5%9C%A8-tidb-%E4%B8%AD%E7%9A%84%E5%BA%94%E7%94%A8) ，默认 scrape_interval 为 15s，以下的变更均指 TiCDC 内存中的监控指标变更逻辑，**即：不考虑内存持久化部分逻辑，集中分析指标意义。**    
2. 下文所指 **“prometheus client 功能”**，表示。如：会注册 进程收集器、Go 收集器等，分别用于收集基本的 Linux 进程信息，比如 CPU、内存、文件描述符使用情况，以及启动时间等，及收集有关 Go 运行时的信息，比如 GC、gouroutine 和 OS 线程的数量等信息。**为避免文章冗余，统称 “prometheus client 功能”**，如遇到该类指标不准情况，可以去 Prometheus Github Repo 查看相关或创建 Issue 讨论。     




## Server面板

### Uptime
产生：采用 Prometheus Counter 类型统计，节点进程正常通常情况下，其值不断自增，发生重启时该值会被重置为零并开启新一轮的累积自增；
变更：进程运行时指标值记录，不断自增；
消亡：进程结束时指标值归零；
作用：TiKV 节点和 TiCDC 节点已经运行的时间，包括 Capture 节点，PD 节点及 TiKV 节点自上一次进程启动开始到现在为止的运行时间。用于问题诊断时，分析组建进程重启与当前问题的相关性。
原理：数据来自/proc/stat，将start_time 除以 USER_HZ得到以秒为单位的值。