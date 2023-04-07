# DM Master

## 一、选举

1. **第一**，是一个命令包，封装在etcd的基础上实现领导人选举功能。
2. **第二**，函数[compaignLoop](https://github.com/pingcap/tiflow/blob/c65e2b72198de10319008b31dcf13d51509ccfde/dm/pkg/election/election.go#L200)是理解逻辑概念如何连续运行的关键。定期，它会重新运动领导者的DM主实例和领导者将**启动**一些组件，包括'调度器'，'悲观者'和'乐观主义者'。
3. **第三**，它还将任务分解为子任务，这些子任务只代表一个迁移任务中的一个源。

## 二、调度器

1. **首先**，调度器是Master的一部分，它负责DM worker的任务，如“注册/取消注册”，“观察在线/离线”，“观察添加/删除源配置”，“计划上游源”，“计划数据迁移子任务”等等，更多详细信息请参阅[这里](https://github.com/pingcap/tiflow/blob/c65e2b72198de10319008b31dcf13d51509ccfde/dm/master/scheduler/scheduler.go#L44)。
2. **第二**，调度器实际上做的是，一方面，一些后台gorountines在启动主实例后持续运行，如[`observeWorkerEvent`](https://github.com/pingcap/tiflow/blob/c65e2b72198de10319008b31dcf13d51509ccfde/dm/master/scheduler/scheduler.go#L2081)，另一方面，当dmctl或openAPI发送一些操作时，其他的将被触发，如:[`RemoveSourceCfg`](https://github.com/pingcap/tiflow/blob/c65e2b72198de10319008b31dcf13d51509ccfde/dm/master/scheduler/scheduler.go # L441)。大多数情况下，函数都嵌入到GRPC定义中。

## 三、悲观模式

1. PTAL在[分片-合并-悲观](https://docs.pingcap.com/zh/tidb-data-migration/v5.3/feature-shard-merge-pessimistic#%E5%AE%9E%E7%8E%B0%E5%8E%9F%E7%90%86)。DDL 执行顺序的[细节可参考 doc](https://github.com/pingcap/tiflow/blob/c65e2b72198de10319008b31dcf13d51509ccfde/dm/pkg/shardddl/pessimism/doc.go)。简而言之，它实际上所做的是将DM集群中的每个DML保存在特定DDL时间戳之前，直到DDL结束。简而言之，如果在一个分片组中存在DDL复制(将多个MySQL分片表转换为一个TiDB表)，第一个满足DDL查询的worker将通知DM-Master生成一个查看，然后忽略相关的DDL和DML查询。在所有源的DDL都报告给DM-Master之前，已经被选为所有者的那个worker开始执行DDL。如果成功执行了DDL，它将重放被忽略的DDL和DML查询，并像往常一样重放复制。

2. `LockKeeper` 封装了 `Lock`，用于方便地保存和处理DDL锁，并且在复制任务中，锁与DDL在特定时间是1对1的关系。两人也都不需要当总统。因为它可以从DM-Worker保存在DM-Master etcd中的碎片DDL信息重新构建。并且，这个strcut有一个名为 `TrySync` 的关键函数，它是通过增加剩余的数量来同步锁，这个数量等于源(相关 worker)的数量。

    ```go
    type Lock struct {
    mu sync.RWMutex

    ID     string   // lock's ID
    Task   string   // lock's corresponding task name
    Owner  string   // Owner's source ID (not DM-worker's name)
    DDLs   []string // DDL statements
    remain int      // remain count of sources needed to receive DDL info

    // whether the DDL info received from the source.
    // if all of them have been ready, then we call the lock `synced`.
    ready map[string]bool

    // whether the operations have done (exec/skip the shard DDL).
    // if all of them have done, then we call the lock `resolved`.
    done map[string]bool
    }

    type LockKeeper struct {
    mu    sync.RWMutex
    locks map[string]*Lock // lockID -> Lock
    }
    ```

3. `Info` 表示分片 DDL info，`Operation` 表示分片 DDL 坐标操作，这些信息应该持久化在 etcd 中。

    ```go
    type Info struct {
        Task   string   `json:"task"`   // data migration task name
        Source string   `json:"source"` // upstream source ID
        Schema string   `json:"schema"` // schema name of the DDL
        Table  string   `json:"table"`  // table name of the DDL
        DDLs   []string `json:"ddls"`   // DDL statements
    }

    type Operation struct {
        ID     string   `json:"id"`     // the corresponding DDL lock ID
        Task   string   `json:"task"`   // data migration task name
        Source string   `json:"source"` // upstream source ID
        DDLs   []string `json:"ddls"`   // DDL statements
        Exec   bool     `json:"exec"`   // execute or skip the DDL statements
        Done   bool     `json:"done"`   // whether the `Exec` operation has done

        // only used to report to the caller of the watcher, do not marsh it.
        // if it's true, it means the Operation has been deleted in etcd.
        IsDeleted bool `json:"-"`
    }
    ```

    ![pessimism](https://download.pingcap.com/images/tidb-data-migration/shard-ddl-flow.png)

## 四、乐观模式

![optimistic](https://download.pingcap.com/images/tidb-data-migration/optimistic-ddl-flow.png)
