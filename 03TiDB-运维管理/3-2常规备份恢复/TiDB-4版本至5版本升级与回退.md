升级 v5.1 集群步骤





1. 停止 v4.0.10 集群，如 
tiup cluster stop ylbank
2. 备份元数据
cd /home/tidb/.tiup/storage/cluster/clusters 
cp -rp ylbank  ylbank-test
3. 替换 meta 信息
sed -i 's/ylbank/ylbank-test/g' meta.yaml
sed -i 's/ylbank/ylbank-test/g' config-cache/*
4. 备份所有节点的部署目录和数据目录，如
ssh -i ./ssh/id_rsa tidb@172.16.5.143 "cp -rp /home/tidb/ylbank /home/tidb/ylbank-test"
5. 备份所有节点的 service 文件，如
ssh -i ./ssh/id_rsa tidb@172.16.5.143 "sudo mkdir -p /tmp/bak && sudo cp -r /etc/systemd/system/*.service /tmp/bak/"
6. 替换 tikv 配置信息，如
ssh -i ./ssh/id_rsa tidb@172.16.5.138 "sed -i 's/ylbank/ylbank-test/g' /home/tidb/ylbank-test/tidb-data/tikv-25167/last_tikv.toml"
7. 启动备份集群
tiup cluster start ylbank-test
8. 升级备份集群到 v5.1
tiup cluster upgrade ylbank-test v5.1.1

还原到 v4.0.10 步骤
1. 停止备份集群
tiup cluster stop ylbank-test
2. 清理备份集群各节点目录，如果用 destroy 清理集群，会同时清理掉 service 文件和 public key
ssh -i ./ssh/id_rsa tidb@172.16.5.143 "rm -rf /home/tidb/ylbank-test"
3. 还原 service 文件
ssh -i ./ssh/id_rsa tidb@172.16.4.127 "sudo cp /tmp/bak/*.service /etc/systemd/system/"
4. 启动原集群
tiup cluster start ylbank