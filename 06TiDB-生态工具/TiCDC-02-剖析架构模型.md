## 一、同步模型

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;在 **流式处理（事件处理）** 中，




## 二、产品架构

![05ticdc_architecture](./CDC-01-简述背景架构/05ticdc_architecture.png)









## 三、增量扫

CDC 在创建链接的请求中会带上 checkpoint_ts。TiKV 需要在收到请求后，构造时间范围 (checkpoint_ts, uint64::MAX] 然后扫相应范围。外部传入一个 rocksdb snapshot，在这个 snapshot 上扫出大于 checkpoint_ts 的所有记录。

增量扫接口 --> https://github.com/pingcap/kvproto/blob/cdc/proto/cdcpb.proto

begin;
update Jan set name = 'Jan Su' where name = 'Jan';
commit;

转译一下

begin; @TS-1
update Jan set name = 'Jan Su' where name = 'Jan';@TS-2
commit;@TS-3

增量扫 (TS-1,TS-5] 便是 

perwrite：default cf 和 lock cf 的变更
commit：lock cf 和 write cf 的变更


CDC 增量扫与 BR 增量扫的区别，BR 取 SI 隔离级别先扫 Lock CF，如果出现参数范围内的锁则终止扫描，如果未出现锁则继续扫 write cf + default cf，取出相关数据返回。而 CDC 而言，遇到 Lock 时不用返回错误，而是根据 Lock 构造出相应的 perwirte 记录。
扫描顺序从前往后，相同 key 按时间倒序排列
    增量扫支持两个模式
    遇到 lock 不报错 ?
    同时返回 P+C，key 顺序从小到大排序，相同 key 按照时间倒序排列
    遇到 lock 报错  RR 
    先扫 lock ，确认没有 lock 后，再扫 write
from https://tidb.wiki.pingcap.net/view/1TzvFbv9buFgkLzXY_EX8Kp_Gl-C1WidcPKp6W8qKBXs?n=


## 四、持续推流   



