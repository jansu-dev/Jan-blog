# 基准测试操作流程

## sysbench

* **sysbench**是什么？

在sysbench主要支持 MySQL,pgsql,oracle 这3种数据库



* **sysbench部署**

sysbench依赖安装
```
yum -y install  make automake libtool pkgconfig libaio-devel vim-common
```
sysbench安装
```
yum list

yum install sysbench
```
验证sysbench
```
sysbench --version
```
[sysbench project link:https://github.com/akopytov/sysbench](https://github.com/akopytov/sysbench)


![体系结构图](http://cdn.lifemini.cn/dbblog/20201013/162ff66eca8948569edb35eb4d3cd92d.jpg)


### 测试CPU性能


### 测试线程性能



### 测试IO性能

### 测试内存性能


### 测试mutex


### 测试OLTP性能




# 参考文章

[美团tech：https://tech.meituan.com/2017/07/14/sysbench-meituan.html](https://tech.meituan.com/2017/07/14/sysbench-meituan.html)

[老叶茶馆：https://yq.aliyun.com/articles/640848](https://yq.aliyun.com/articles/640848)