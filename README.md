# TiDB-Learning-Notes

![image.png](http://cdn.lifemini.cn/dbblog/20210123/5dae983117ea487aafc60162651b254d.png)

That the repository was build is aim to log process of mysql TiDB Learning.


> - [推荐书籍](#推荐书籍)  
> - [TiDB原理探究](#TiDB原理探究)  
> - [TiDB部署运维](#TiDB部署运维)  
> - [TiDB周边生态](#TiDB周边生态)  
> - [TiDB调优相关](#TiDB调优相关)  
> - [TiDB实践问题归纳](#TiDB实践问题归纳)  
> - [DEBUG-TiDB](#DEBUG-TiDB)     
> - [DEBUG-TiKV](#DEBUG-TiKV)     



## 推荐书籍

 - [**tidb-in-action**](https://github.com/tidb-incubator/tidb-in-action/blob/master/SUMMARY.md)  
 - [**How do we build TiDB**](https://www.pingcap.com/blog-cn/how-do-we-build-tidb/)  
 - [**三篇文章了解 TiDB 技术内幕 - 说存储**](https://pingcap.com/blog-cn/tidb-internal-1/)  
 - [**三篇文章了解 TiDB 技术内幕 - 说计算**](https://pingcap.com/blog-cn/tidb-internal-2/)  
 - [**三篇文章了解 TiDB 技术内幕 - 谈调度**](https://pingcap.com/blog-cn/tidb-internal-3/)  
 - [**茶歇驿站-TiDB**](https://maiyang.me/categories/tidb/)

## TiDB原理探究

 - [TiDB-架构原理总体摘要](https://github.com/jansu-dev/TiDB-Learning-Notes/blob/master/TiDB%E5%8E%9F%E7%90%86%E6%80%BB%E7%BB%93/TiDB-%E6%9E%B6%E6%9E%84%E5%8E%9F%E7%90%86%E6%80%BB%E4%BD%93%E6%91%98%E8%A6%81.md)

 - [Spanner Paper 学习笔记(未整理完)](https://github.com/jansu-dev/TiDB-Learning-Notes/blob/master/TiDB%E5%8E%9F%E7%90%86%E6%80%BB%E7%BB%93/Spanner%20Paper%20%E5%AD%A6%E4%B9%A0%E7%AC%94%E8%AE%B0.md)

 - [Percolator paper 学习笔记(未整理完)](https://github.com/jansu-dev/TiDB-Learning-Notes/blob/master/TiDB%E5%8E%9F%E7%90%86%E6%80%BB%E7%BB%93/Percolator%20paper%20%E5%AD%A6%E4%B9%A0%E7%AC%94%E8%AE%B0.md)

 - [TiDB-TiKV原理探究(未整理完)](https://github.com/jansu-dev/TiDB-Learning-Notes/blob/master/TiDB%E5%8E%9F%E7%90%86%E6%80%BB%E7%BB%93/TiDB-TiKV%E5%8E%9F%E7%90%86%E6%8E%A2%E7%A9%B6.md)

 - [数据库事务隔离界别CASE详解](https://github.com/jansu-dev/TiDB-Learning-Notes/blob/master/TiDB%E5%8E%9F%E7%90%86%E6%80%BB%E7%BB%93/%E4%BA%8B%E5%8A%A1%E7%9A%84%E9%9A%94%E7%A6%BB%E7%BA%A7%E5%88%AB.md)

## TiDB部署运维

 - 部署前环境监测
    - [TiDB-集群部署前环境检测(未整理完)](https://github.com/jansu-dev/TiDB-Learning-Notes/blob/master/TIDB-%E9%83%A8%E7%BD%B2%E5%AE%9E%E8%B7%B5/TiDB-%E9%9B%86%E7%BE%A4%E9%83%A8%E7%BD%B2%E5%89%8D%E7%8E%AF%E5%A2%83%E6%A3%80%E6%B5%8B.md)

 - Ansible工具
    - [TiDB-Ansible部署工具简介与TiDB集群部署](https://github.com/jansu-dev/TiDB-Learning-Notes/blob/master/TIDB-%E9%83%A8%E7%BD%B2%E5%AE%9E%E8%B7%B5/TiDB-Ansible%E9%83%A8%E7%BD%B2%E5%B7%A5%E5%85%B7%E7%AE%80%E4%BB%8B%E4%B8%8ETiDB%E9%9B%86%E7%BE%A4%E9%83%A8%E7%BD%B2.md)



    - [TiDB-TiDB集群Ansible方式节点扩容](https://github.com/jansu-dev/TiDB-Learning-Notes/blob/master/TIDB-%E9%83%A8%E7%BD%B2%E5%AE%9E%E8%B7%B5/TiDB-TiDB%E9%9B%86%E7%BE%A4Ansible%E6%96%B9%E5%BC%8F%E8%8A%82%E7%82%B9%E6%89%A9%E5%AE%B9.md)


    - [TiDB-TiDB集群Ansible方式节点缩容](https://github.com/jansu-dev/TiDB-Learning-Notes/blob/master/TIDB-%E9%83%A8%E7%BD%B2%E5%AE%9E%E8%B7%B5/TiDB-TiDB%E9%9B%86%E7%BE%A4Ansible%E6%96%B9%E5%BC%8F%E8%8A%82%E7%82%B9%E7%BC%A9%E5%AE%B9.md)

    - [TiDB-TiKV集群Ansible方式节点扩容](https://github.com/jansu-dev/TiDB-Learning-Notes/blob/master/TIDB-%E9%83%A8%E7%BD%B2%E5%AE%9E%E8%B7%B5/TiDB-TiKV%E9%9B%86%E7%BE%A4Ansible%E6%96%B9%E5%BC%8F%E8%8A%82%E7%82%B9%E6%89%A9%E5%AE%B9.md)

    - [TiDB-TiKV集群Ansible方式节点缩容](https://github.com/jansu-dev/TiDB-Learning-Notes/blob/master/TIDB-%E9%83%A8%E7%BD%B2%E5%AE%9E%E8%B7%B5/TiDB-TiKV%E9%9B%86%E7%BE%A4Ansible%E6%96%B9%E5%BC%8F%E8%8A%82%E7%82%B9%E7%BC%A9%E5%AE%B9.md)

    - [TiDB-PD集群Ansible方式节点扩容](https://github.com/jansu-dev/TiDB-Learning-Notes/blob/master/TIDB-%E9%83%A8%E7%BD%B2%E5%AE%9E%E8%B7%B5/TiDB-PD%E9%9B%86%E7%BE%A4Ansible%E6%96%B9%E5%BC%8F%E8%8A%82%E7%82%B9%E6%89%A9%E5%AE%B9.md)

    - [TiDB-PD集群Ansible方式节点缩容](https://github.com/jansu-dev/TiDB-Learning-Notes/blob/master/TIDB-%E9%83%A8%E7%BD%B2%E5%AE%9E%E8%B7%B5/TiDB-PD%E9%9B%86%E7%BE%A4Ansible%E6%96%B9%E5%BC%8F%E8%8A%82%E7%82%B9%E7%BC%A9%E5%AE%B9.md)


    - [TiDB-单机多TiKV实例、多TiDB实例部署](https://github.com/jansu-dev/TiDB-Learning-Notes/blob/master/TIDB-%E9%83%A8%E7%BD%B2%E5%AE%9E%E8%B7%B5/TiDB-%E5%8D%95%E6%9C%BA%E5%A4%9ATiKV%E5%AE%9E%E4%BE%8B%E3%80%81%E5%A4%9ATiDB%E5%AE%9E%E4%BE%8B%E9%83%A8%E7%BD%B2.md)


    - [sysbench基准测试简介与操作流程](https://github.com/jansu-dev/TiDB-Learning-Notes/blob/master/TIDB-%E9%83%A8%E7%BD%B2%E5%AE%9E%E8%B7%B5/sysbench%E5%9F%BA%E5%87%86%E6%B5%8B%E8%AF%95.md)

    - [TiDB-中控机Ansible部署修改集群配置滚动升级](https://github.com/jansu-dev/TiDB-Learning-Notes/blob/master/TIDB-%E9%83%A8%E7%BD%B2%E5%AE%9E%E8%B7%B5/TiDB-%E4%B8%AD%E6%8E%A7%E6%9C%BAAnsible%E9%83%A8%E7%BD%B2%E4%BF%AE%E6%94%B9%E9%9B%86%E7%BE%A4%E9%85%8D%E7%BD%AE%E6%BB%9A%E5%8A%A8%E5%8D%87%E7%BA%A7.md)

 - TiUP工具
    - [TiDB-TiUP工具集群离线部署方案](https://github.com/jansu-dev/TiDB-Learning-Notes/blob/master/TIDB-%E9%83%A8%E7%BD%B2%E5%AE%9E%E8%B7%B5/TiDB-TiUP%E5%B7%A5%E5%85%B7%E9%9B%86%E7%BE%A4%E7%A6%BB%E7%BA%BF%E9%83%A8%E7%BD%B2%E6%96%B9%E6%A1%88.md)

    - [TiDB-TiUP工具集群滚动升级](https://github.com/jansu-dev/TiDB-Learning-Notes/blob/master/TIDB-%E9%83%A8%E7%BD%B2%E5%AE%9E%E8%B7%B5/TiDB-TiUP%E5%B7%A5%E5%85%B7%E9%9B%86%E7%BE%A4%E6%BB%9A%E5%8A%A8%E5%8D%87%E7%BA%A7.md)

    - [TiDB-TiUP工具集群扩缩容TiDB、TiKV、PD](https://github.com/jansu-dev/TiDB-Learning-Notes/blob/master/TIDB-%E9%83%A8%E7%BD%B2%E5%AE%9E%E8%B7%B5/TiDB-TiUP%E5%B7%A5%E5%85%B7%E9%9B%86%E7%BE%A4%E6%89%A9%E7%BC%A9%E5%AE%B9TiDB%E3%80%81TiKV%E3%80%81PD.md)

    - [TiDB-TiSpark依靠TiUP工具协助部署集群](https://github.com/jansu-dev/TiDB-Learning-Notes/blob/master/TIDB-%E9%83%A8%E7%BD%B2%E5%AE%9E%E8%B7%B5/TiDB-TiSpark%E4%BE%9D%E9%9D%A0TiUP%E5%B7%A5%E5%85%B7%E5%8D%8F%E5%8A%A9%E9%83%A8%E7%BD%B2%E9%9B%86%E7%BE%A4.md)

 - TiDB版本特性
    - [5.0.0-rc新特性](https://github.com/jansu-dev/TiDB-Learning-Notes/blob/master/TIDB-%E9%83%A8%E7%BD%B2%E5%AE%9E%E8%B7%B5/%E7%89%88%E6%9C%AC%E7%89%B9%E6%80%A7/TiDB-5.0.0-rc%20%E6%96%B0%E7%89%B9%E6%80%A7.md)

## TiDB周边生态

 - TiUP 工具套件
    - [TiDB-TiUP集成套件工具原理与使用笔记](https://github.com/jansu-dev/TiDB-Learning-Notes/blob/master/TiDB-%E7%94%9F%E6%80%81%E5%B7%A5%E5%85%B7/TiDB-TiUP%E9%9B%86%E6%88%90%E5%A5%97%E4%BB%B6%E5%B7%A5%E5%85%B7%E5%8E%9F%E7%90%86%E4%B8%8E%E4%BD%BF%E7%94%A8%E7%AC%94%E8%AE%B0.md)

 - 备份恢复与数据迁移  
    - [TiDB-Dumpling原理简介与参数札记](https://github.com/jansu-dev/TiDB-Learning-Notes/blob/master/TiDB-%E7%94%9F%E6%80%81%E5%B7%A5%E5%85%B7/TiDB-Dumpling%E5%8E%9F%E7%90%86%E7%AE%80%E4%BB%8B%E4%B8%8E%E5%8F%82%E6%95%B0%E6%9C%AD%E8%AE%B0.md)

    - [TiDB-BR工具原理简介与使用](https://github.com/jansu-dev/TiDB-Learning-Notes/blob/master/TiDB-%E7%94%9F%E6%80%81%E5%B7%A5%E5%85%B7/TiDB-BR%E5%B7%A5%E5%85%B7%E5%8E%9F%E7%90%86%E7%AE%80%E4%BB%8B%E4%B8%8E%E4%BD%BF%E7%94%A8.md)

    - [TiDB-lightning工具原理简介与使用](https://github.com/jansu-dev/TiDB-Learning-Notes/blob/master/TiDB-%E7%94%9F%E6%80%81%E5%B7%A5%E5%85%B7/TiDB-lightning%E5%B7%A5%E5%85%B7%E5%8E%9F%E7%90%86%E7%AE%80%E4%BB%8B%E4%B8%8E%E4%BD%BF%E7%94%A8.md)  

    - [TiDB-DM工具原理简介与使用](https://github.com/jansu-dev/TiDB-Learning-Notes/blob/master/TiDB-%E7%94%9F%E6%80%81%E5%B7%A5%E5%85%B7/TiDB-DM%E5%B7%A5%E5%85%B7%E5%8E%9F%E7%90%86%E7%AE%80%E4%BB%8B%E4%B8%8E%E4%BD%BF%E7%94%A8.md)

 - TiDB安全
    - [TiDB-基于RBAC的权限管理](https://github.com/jansu-dev/TiDB-Learning-Notes/blob/master/TiDB-%E8%BF%90%E7%BB%B4%E7%AE%A1%E7%90%86/TiDB-%E5%9F%BA%E4%BA%8ERBAC%E7%9A%84%E6%9D%83%E9%99%90%E7%AE%A1%E7%90%86.md)
    - [TiDB-TLS加密传输安全协议原理与应用](https://github.com/jansu-dev/TiDB-Learning-Notes/blob/master/TiDB-%E8%BF%90%E7%BB%B4%E7%AE%A1%E7%90%86/TiDB-TLS%E5%8A%A0%E5%AF%86%E4%BC%A0%E8%BE%93%E5%AE%89%E5%85%A8%E5%8D%8F%E8%AE%AE%E5%8E%9F%E7%90%86%E4%B8%8E%E5%BA%94%E7%94%A8.md)  

    - [TiDB-主键与auto_increment](https://github.com/jansu-dev/TiDB-Learning-Notes/blob/master/TiDB-%E8%BF%90%E7%BB%B4%E7%AE%A1%E7%90%86/TiDB-%E4%B8%BB%E9%94%AE%E4%B8%8Eauto_increment.md)

 - 周边组件  

  - [Etcd原理与使用](https://github.com/jansu-dev/TiDB-Learning-Notes/blob/master/TiDB-%E5%8E%9F%E7%90%86%E6%80%BB%E7%BB%93/Component-Etcd%E5%8E%9F%E7%90%86%E4%B8%8E%E4%BD%BF%E7%94%A8.md#etcdctl%E5%8F%82%E6%95%B0%E5%AE%9E%E8%B7%B5)

## TiDB调优相关

 - Prometheus监控与Grafana可视化   
    - [TiDB-Grafana监控解读之Overview](https://github.com/jansu-dev/TiDB-Learning-Notes/blob/master/TiDB-%E8%B0%83%E4%BC%98%E5%AE%9E%E8%B7%B5/TiDB-%E8%B0%83%E4%BC%98%E8%A7%86%E5%9B%BE%E5%BD%92%E7%BA%B3/TiDB-Grafana%E7%9B%91%E6%8E%A7%E8%A7%A3%E8%AF%BB%E4%B9%8BOverview.md)  
    - [TiDB-Grafana监控解读之TiKV](https://github.com/jansu-dev/TiDB-Learning-Notes/blob/master/TiDB-%E8%B0%83%E4%BC%98%E5%AE%9E%E8%B7%B5/TiDB-%E8%B0%83%E4%BC%98%E8%A7%86%E5%9B%BE%E5%BD%92%E7%BA%B3/TiDB-Grafana%E7%9B%91%E6%8E%A7%E8%A7%A3%E8%AF%BB%E4%B9%8BTiKV.md)  
    - [TiDB-Grafana监控解读之TiDB](https://github.com/jansu-dev/TiDB-Learning-Notes/blob/master/TiDB-%E8%B0%83%E4%BC%98%E5%AE%9E%E8%B7%B5/TiDB-%E8%B0%83%E4%BC%98%E8%A7%86%E5%9B%BE%E5%BD%92%E7%BA%B3/TiDB-Grafana%E7%9B%91%E6%8E%A7%E8%A7%A3%E8%AF%BB%E4%B9%8BTiDB.md)  
    - [TiDB-Grafana监控解读之PD](https://github.com/jansu-dev/TiDB-Learning-Notes/blob/master/TiDB-%E8%B0%83%E4%BC%98%E5%AE%9E%E8%B7%B5/TiDB-%E8%B0%83%E4%BC%98%E8%A7%86%E5%9B%BE%E5%BD%92%E7%BA%B3/TiDB-Grafana%E7%9B%91%E6%8E%A7%E8%A7%A3%E8%AF%BB%E4%B9%8BPD.md)  

 - SQL 生命周期与关键指标     
    - [SQL语句专项](https://github.com/jansu-dev/TiDB-Learning-Notes/blob/master/TiDB-%E8%B0%83%E4%BC%98%E5%AE%9E%E8%B7%B5/TiDB-SQL%E8%B0%83%E4%BC%98%E5%BD%92%E7%BA%B3/SQL%20%E8%AF%AD%E5%8F%A5%E4%B8%93%E9%A1%B9.md)  
    - [索引管理专项](https://github.com/jansu-dev/TiDB-Learning-Notes/blob/master/TiDB-%E8%B0%83%E4%BC%98%E5%AE%9E%E8%B7%B5/TiDB-SQL%E8%B0%83%E4%BC%98%E5%BD%92%E7%BA%B3/INDEX%E7%AE%A1%E7%90%86%E4%B8%93%E9%A1%B9.md)  

 - 调优参数归纳与实践
    - [TiDB-TiDB集群参数归纳整理](https://github.com/jansu-dev/TiDB-Learning-Notes/blob/master/TiDB-%E8%B0%83%E4%BC%98%E5%AE%9E%E8%B7%B5/TiDB-%E9%85%8D%E7%BD%AE%E5%8F%82%E6%95%B0%E5%BD%92%E7%BA%B3/TiDB%E9%9B%86%E7%BE%A4%E5%8F%82%E6%95%B0%E5%BD%92%E7%BA%B3%E6%95%B4%E7%90%86.md)    
    - [TiDB-TiKV集群参数归纳整理](https://github.com/jansu-dev/TiDB-Learning-Notes/blob/master/TiDB-%E8%B0%83%E4%BC%98%E5%AE%9E%E8%B7%B5/TiDB-%E9%85%8D%E7%BD%AE%E5%8F%82%E6%95%B0%E5%BD%92%E7%BA%B3/TiKV%E9%9B%86%E7%BE%A4%E5%8F%82%E6%95%B0%E5%BD%92%E7%BA%B3%E6%95%B4%E7%90%86.md)    
    - [TiDB-PD集群参数归纳整理]()    

 - TiDB-CASE解决方案  
   - [SQL Duration 升高现象问题排查](./TiDB-调优实践/TiDB-CASE解决方案/CASE-磁盘抖动导致Duration抖动现象问题.md)  

   - [SQL Binding 修正 CBO 优化器不稳定情况](https://github.com/jansu-dev/TiDB-Learning-Notes/blob/master/TiDB-%E8%B0%83%E4%BC%98%E5%AE%9E%E8%B7%B5/TiDB-CASE%E8%A7%A3%E5%86%B3%E6%96%B9%E6%A1%88/SQL%20Binding%20%E4%BF%AE%E6%AD%A3%20CBO%20%E4%BC%98%E5%8C%96%E5%99%A8%E4%B8%8D%E7%A8%B3%E5%AE%9A%E6%83%85%E5%86%B5.md)  


## TiDB实践问题归纳

 - [TiDB-4.0.9版本开始tiflash组件弃用path警告问题](https://github.com/jansu-dev/TiDB-Learning-Notes/blob/master/TiDB-%E5%B8%B8%E8%A7%81%E9%94%99%E8%AF%AF/TiDB-4.0.9%E7%89%88%E6%9C%AC%E5%BC%80%E5%A7%8Btiflash%E7%BB%84%E4%BB%B6%E5%BC%83%E7%94%A8path%E8%AD%A6%E5%91%8A%E9%97%AE%E9%A2%98.md)

 - [TiDB-handshake failed问题解决](https://github.com/jansu-dev/TiDB-Learning-Notes/blob/master/TiDB-%E5%B8%B8%E8%A7%81%E9%94%99%E8%AF%AF/TiDB-handshake%20failed%E9%97%AE%E9%A2%98%E8%A7%A3%E5%86%B3.md)


## DEBUG-TiDB

 - [GoLang-Learning-Notes](https://github.com/jansu-dev/Go-Learning-Notes)   
 TiDB 由 go 语言实现，在阅读 TiDB 源码之前需具备一定 go 语言编程基础；

 - [词法与语法解析概念、goyacc实践](https://github.com/jansu-dev/TiDB-Learning-Notes/blob/master/TiDB-DEBUG/Lex%20%26%20Yacc%20concept%20and%20goyacc%20practice.md)   
 lex & yacc 是流行的词法解析器及句法分析器，goyacc 是 go 语言官方支持的、稳定的库模块。TiDB 使用 goyacc 实现将 SQL 语句的解析转换为 AST，进行后续处理，理解相关概念十分必要；  

 - [TiDB-Centos构建Debug环境](https://github.com/jansu-dev/TiDB-Learning-Notes/blob/master/TiDB-DEBUG/TiDB-Centos%E6%9E%84%E5%BB%BADebug%E7%8E%AF%E5%A2%83.md)  

 - [TiDB-启动流程之注册KV驱动与Store](https://github.com/jansu-dev/TiDB-Learning-Notes/blob/master/TiDB-DEBUG/TiDB-%E5%90%AF%E5%8A%A8%E6%B5%81%E7%A8%8B%E4%B9%8B%E6%B3%A8%E5%86%8C%20KV%20%E9%A9%B1%E5%8A%A8%E4%B8%8E%20Store.md)  

 - [TiDB-TiDB源码executer部分理解](https://github.com/jansu-dev/TiDB-Learning-Notes/blob/master/TiDB-DEBUG/TiDB-TiDB%E6%BA%90%E7%A0%81executer%E9%83%A8%E5%88%86%E7%90%86%E8%A7%A3.md)   





## DEBUG-TiKV
> - [TiKV_SourceCode_Blog_Recommand](#TiKV_SourceCode_Blog_Recommand) 

#### TiKV_SourceCode_Blog_Recommand
 - [TIDB存储——TIKV](https://qiankunli.github.io/2019/07/15/tidb_tikv.html)