# TiDB-TiUP工具集群离线部署方案


## 下载TiUP离线组件

```
[root@tiup-tidb41 ~]# useradd tidb

[root@tiup-tidb41 ~]# passwd tidb

[root@tiup-tidb41 ~]# su - tidb

[tidb@tiup-tidb44 ~]$ curl --proto '=https' --tlsv1.2 -sSf https://tiup-mirrors.pingcap.com/install.sh | sh
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
 23 8697k   23 2015k    0     0   303k      0  0:00:28  0:00:06  0:00:22  417k
```

```
[tidb@tiup-tidb44 ~]$ tiup mirror clone tidb-community-server-v4.0.2-linux-amd64 ${version} --os=linux --arch=amd64

Start to clone mirror, targetDir is tidb-community-server-v4.0.2-linux-amd64, selectedVersions are []
If this does not meet expectations, please abort this process, read `tiup mirror clone --help` and run again
Arch [amd64]
OS [linux]
......
......
download https://tiup-mirrors.pingcap.com/tiup-linux-amd64.tar.gz 8.49 MiB / 8.49 MiB 100.00% 806.71 KiB p/s

[tidb@tiup-tidb44 ~]$ ll
total 0
drwxr-xr-x. 3 tidb tidb 172 Jan  9 11:40 tidb-community-server-v4.0.2-linux-amd64

[tidb@tiup-tidb44 ~]$ cd tidb-community-server-v4.0.2-linux-amd64/

[tidb@tiup-tidb44 tidb-community-server-v4.0.2-linux-amd64]$ ll
total 8732
-rw-r--r--. 1 tidb tidb    1246 Jan  9 11:40 1.index.json
-rw-r--r--. 1 tidb tidb    5221 Jan  9 11:40 1.root.json
drwxr-xr-x. 2 tidb tidb     257 Jan  9 11:39 keys
-rwxr-xr-x. 1 tidb tidb    2086 Jan  9 11:40 local_install.sh
-rw-r--r--. 1 tidb tidb    5221 Jan  9 11:40 root.json
-rw-r--r--. 1 tidb tidb     641 Jan  9 11:40 snapshot.json
-rw-r--r--. 1 tidb tidb     818 Jan  9 11:40 timestamp.json
-rw-r--r--. 1 tidb tidb 8906707 Jan  9 11:40 tiup-linux-amd64.tar.gz

[tidb@tiup-tidb44 tidb-community-server-v4.0.2-linux-amd64]$ ./local_install.sh 
Set mirror to /home/tidb/tidb-community-server-v4.0.2-linux-amd64 success
Detected shell: bash
Shell profile:  /home/tidb/.bash_profile
Installed path: /home/tidb/.tiup/bin/tiup
===============================================
1. source /home/tidb/.bash_profile
2. Have a try:   tiup playground
===============================================

[tidb@tiup-tidb44 ~]$ tar -cvf tidb-community-server-v4.0.2-linux-amd64.tar.gz tidb-community-server-v4.0.2-linux-amd64
tidb-community-server-v4.0.2-linux-amd64/
......
......
tidb-community-server-v4.0.2-linux-amd64/local_install.sh

[tidb@tiup-tidb44 ~]$ ll -lrth
total 1.5G
drwxr-xr-x. 3 tidb tidb 4.0K Jan  9 00:26 tidb-community-server-v4.0.2-linux-amd64
-rw-rw-r--. 1 tidb tidb 1.5G Jan  9 00:28 tidb-community-server-v4.0.2-linux-amd64.tar.gz

[tidb@tiup-tidb44 ~]$ scp tidb-community-server-v4.0.2-linux-amd64.tar.gz 192.168.169.41:/home/tidb/
Warning: Permanently added '192.168.169.41' (ECDSA) to the list of known hosts.
tidb@192.168.169.41's password: 
tidb-community-server-v4.0.2-linux-amd64.tar.gz                                                                                                                                  56%  869MB 129.1MB/s   00:05 ETA

[tidb@tiup-tidb41 ~]$ tar -xvf tidb-community-server-v4.0.2-linux-amd64.tar.gz 
tidb-community-server-v4.0.2-linux-amd64/
......
......
tidb-community-server-v4.0.2-linux-amd64/local_install.sh

[tidb@tiup-tidb41 ~]$ ll -lrth
total 1.5G
drwxr-xr-x. 3 tidb tidb 4.0K Jan  9 00:26 tidb-community-server-v4.0.2-linux-amd64
-rw-rw-r--. 1 tidb tidb 1.5G Jan  9 00:30 tidb-community-server-v4.0.2-linux-amd64.tar.gz
```

安装组件
```
[tidb@tiup-tidb41 ~]$ cd tidb-community-server-v4.0.2-linux-amd64

[tidb@tiup-tidb41 tidb-community-server-v4.0.2-linux-amd64]$ ll |grep install
-rwxr-xr-x. 1 tidb tidb      2086 Jan  9 00:26 local_install.sh

[tidb@tiup-tidb41 tidb-community-server-v4.0.2-linux-amd64]$ sh local_install.sh 
Set mirror to /home/tidb/tidb-community-server-v4.0.2-linux-amd64 success
Detected shell: bash
Shell profile:  /home/tidb/.bash_profile
/home/tidb/.bash_profile has been modified to to add tiup to PATH
open a new terminal or source /home/tidb/.bash_profile to use it
Installed path: /home/tidb/.tiup/bin/tiup
===============================================
1. source /home/tidb/.bash_profile
2. Have a try:   tiup playground
===============================================

[tidb@tiup-tidb41 tidb-community-server-v4.0.2-linux-amd64]$ source /home/tidb/.bash_profile
```


## 配置集群免密登录




## TiKV数据盘挂载

修改HHD的磁盘
```
[root@tiup-tidb41 ~]# fdisk -l

Disk /dev/sda: 107.4 GB, 107374182400 bytes, 209715200 sectors
Units = sectors of 1 * 512 = 512 bytes
Sector size (logical/physical): 512 bytes / 512 bytes
I/O size (minimum/optimal): 512 bytes / 512 bytes
Disk label type: dos
Disk identifier: 0x000a1f1f

   Device Boot      Start         End      Blocks   Id  System
/dev/sda1   *        2048      391167      194560   83  Linux
/dev/sda2          391168   199628799    99618816   8e  Linux LVM

Disk /dev/sdb: 107.4 GB, 107374182400 bytes, 209715200 sectors
Units = sectors of 1 * 512 = 512 bytes
Sector size (logical/physical): 512 bytes / 512 bytes
I/O size (minimum/optimal): 512 bytes / 512 bytes


Disk /dev/mapper/centos-root: 102.0 GB, 102001278976 bytes, 199221248 sectors
Units = sectors of 1 * 512 = 512 bytes
Sector size (logical/physical): 512 bytes / 512 bytes
I/O size (minimum/optimal): 512 bytes / 512 bytes

[root@tiup-tidb41 ~]# parted -s -a optimal /dev/sdb mklabel gpt -- mkpart primary ext4 1 -1
[root@tiup-tidb41 ~]# ll /dev/sd*
brw-rw----. 1 root disk 8,  0 Jan  8 23:29 /dev/sda
brw-rw----. 1 root disk 8,  1 Jan  8 23:29 /dev/sda1
brw-rw----. 1 root disk 8,  2 Jan  8 23:29 /dev/sda2
brw-rw----. 1 root disk 8, 16 Jan  8 23:46 /dev/sdb
brw-rw----. 1 root disk 8, 17 Jan  8 23:46 /dev/sdb1

[root@tiup-tidb41 ~]# mkfs.ext4 /dev/sdb1 
mke2fs 1.42.9 (28-Dec-2013)
Filesystem label=
OS type: Linux
Block size=4096 (log=2)
Fragment size=4096 (log=2)
Stride=0 blocks, Stripe width=0 blocks
6553600 inodes, 26213888 blocks
1310694 blocks (5.00%) reserved for the super user
First data block=0
Maximum filesystem blocks=2174746624
800 block groups
32768 blocks per group, 32768 fragments per group
8192 inodes per group
Superblock backups stored on blocks: 
	32768, 98304, 163840, 229376, 294912, 819200, 884736, 1605632, 2654208, 
	4096000, 7962624, 11239424, 20480000, 23887872

Allocating group tables: done                            
Writing inode tables: done                            
Creating journal (32768 blocks): done
Writing superblocks and filesystem accounting information: done   

[root@tiup-tidb41 ~]# lsblk -f
NAME            FSTYPE      LABEL UUID                                   MOUNTPOINT
sda                                                                      
├─sda1          xfs               f5186353-9452-4395-9549-0e0f05401910   /boot
└─sda2          LVM2_member       QjWT3C-PmGV-bIBK-kjxs-zGGE-xnLB-Kqyewx 
  └─centos-root xfs               1c8f5bee-8e88-44d7-99c0-c5d8b1d621bb   /
sdb                                                                      
└─sdb1          ext4              003d05ff-6e97-49ec-abf4-b86be07754b8   
sr0                                                                      

[root@tiup-tidb41 ~]# vi /etc/fstab 

[root@tiup-tidb41 ~]# tail -1 /etc/fstab 
UUID=003d05ff-6e97-49ec-abf4-b86be07754b8 /data ext4    defaults,nodelalloc,noatime       0 2

[root@tiup-tidb41 ~]# mkdir /data

[root@tiup-tidb41 ~]# mount -a

[root@tiup-tidb41 ~]# mount -t ext4
/dev/sdb1 on /data type ext4 (rw,noatime,seclabel,nodelalloc,data=ordered)

```

## 配置topology配置文件


## 部署TiDB集群


## 启动TiDB集群


## 检查集群状态
