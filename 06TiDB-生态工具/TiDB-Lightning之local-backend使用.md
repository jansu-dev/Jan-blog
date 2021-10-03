






#### local-backend注意事项
1. 空间要求新导入数据的目标 TiKV 集群的总存储空间必须大于 数据源大小 × 副本数量 × 2，如：默认 3 副本，总存储空间需为数据源大小的 6 倍以上。
2. tidb-lightning 是 CPU 密集型程序，混合部署时需要限制 tidb-lightning 的 CPU 实际占用核数，以免影响其他程序的正常运行，官方建议：混合部署机器 75% CPU 资源配给 tidb-lightning，如：机器为 32 核，region-concurrency 设为 “24”。
3. TiDB Lightning 运行后，TiDB 集群将无法正常对外提供服务，若 tidb-lightning 崩溃，集群会留在“导入模式”，会产生大量未压缩的文件，消耗 CPU 导致延迟，需用 tidb-lightning-ctl 手动将集群转回“普通模式”
```
bin/tidb-lightning-ctl --switch-mode=normal
```

