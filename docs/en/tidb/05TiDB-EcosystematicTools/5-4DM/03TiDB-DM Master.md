# DM Master

## Election

1. **First**, It's a comman package which's been encapsulated to implment function of leader election based on etcd.
2. **Second**, [compaignLoop](https://github.com/pingcap/tiflow/blob/c65e2b72198de10319008b31dcf13d51509ccfde/dm/pkg/election/election.go#L200) is the key to understand how the logical concept is continuous running. Periodically, it'll recampaign leader of DM master instances and the leader'll **start** some components including `Scheduler`, `Pessimist` and `Optimist`.
3. **Third,** It also spilits task into subtasks which represents only one source in one migration task.

## Scheduler

1. **First**, Scheduler is part of Master, which's responsible for tasks of DM worker, such as `register/unregister`, `observe the online/offline`, `observe add/remove source config`, `schedule upstream sources`, `schedule data migration subtask` and so forth, more details at [here](https://github.com/pingcap/tiflow/blob/c65e2b72198de10319008b31dcf13d51509ccfde/dm/master/scheduler/scheduler.go#L44).  
2. **Second**, what scheduler actully does is that, on the one hand, some background gorountines are countinuous running after starting the master instance like [`observeWorkerEvent`](https://github.com/pingcap/tiflow/blob/c65e2b72198de10319008b31dcf13d51509ccfde/dm/master/scheduler/scheduler.go#L2081), on the other hand, the others will be triggered when dmctl or openAPI sends some operations, like: [`RemoveSourceCfg`](https://github.com/pingcap/tiflow/blob/c65e2b72198de10319008b31dcf13d51509ccfde/dm/master/scheduler/scheduler.go#L441). Mostly, the functions were embended in GRPC defining.

## pessimist

1. PTAL at the [shard-merge-pessimistic](https://docs.pingcap.com/zh/tidb-data-migration/v5.3/feature-shard-merge-pessimistic#%E5%AE%9E%E7%8E%B0%E5%8E%9F%E7%90%86). The [detail](https://github.com/pingcap/tiflow/blob/c65e2b72198de10319008b31dcf13d51509ccfde/dm/pkg/shardddl/pessimism/doc.go) of the sequence of coordinate a shard DDL lock. In short, what it's actually does is keeping every DML in a DM Cluster before a specific DDL timestamp, till the end of the DDL. In short, if there is DDL replication in a sharding group(moulti MySQL sharding tables into one TiDB table), the worker which's the first one to meet the DDL query will notify DM-Master to generate a look then ignore related DDL and DML queries. Till all the DDL of sources have been reported to DM-Master, the one worker which's already been chose as owner starts to execute the DDL. if the DDL was executed successfully, it'll replay the DDL and DML queries ignored and replay replication as usual.

2. `LockKeeper` which encapsulates `Lock` used to keep and handle DDL lock conveniently, and lock has a 1 on 1 relationship with DDL at a specific time in a replication task. Both also don't need to be presistent. Because it can be re-constructed from the shard DDL info which were persisited in to etcd of DM-Master by DM-Worker. And, this strcut has a key founction named `TrySync`, which's to sync the lock by increase the number of remain, which number is equal to the number of sources(related workers).  

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

3. `Info` represents the shard DDL information and `Operation` represents a shard DDL coordinate operation ,which information should be persistent in etcd.

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

## Optimist

1. LockKeeper used to keep and handle DDL lock conveniently. The logical function is equal to Lock in pessimism, just the different name instead of `Lock`.

![optimistic](https://download.pingcap.com/images/tidb-data-migration/optimistic-ddl-flow.png)
