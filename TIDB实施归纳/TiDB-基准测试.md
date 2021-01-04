# 基准测试简介与操作流程

## sysbench

* **sysbench**是什么？

在sysbench主要支持 MySQL,pgsql,oracle 这3种数据库



* **sysbench部署**
sysbench安装步骤如下所示，主要分为依赖安装、软件部署、验证安装三个部分。
```shell

# 安装相关依赖
yum -y install  make automake libtool pkgconfig libaio-devel vim-common

# sysbench安装
yum list
yum install sysbench

# 验证sysbench正确安装，并查看sysbench版本
sysbench --version
```

[**sysbench project link** :https://github.com/akopytov/sysbench](https://github.com/akopytov/sysbench)


### 测试CPU性能


### 测试线程性能



### 测试IO性能

### 测试内存性能


### 测试mutex


### 测试OLTP性能




## 参考文章

[美团tech：https://tech.meituan.com/2017/07/14/sysbench-meituan.html](https://tech.meituan.com/2017/07/14/sysbench-meituan.html)

[老叶茶馆：https://yq.aliyun.com/articles/640848](https://yq.aliyun.com/articles/640848)