# DM Master

## Election

1. **First**, It's a comman package which's been encapsulated to implment function of leader election based on etcd.
2. **Second**, [compaignLoop](https://github.com/pingcap/tiflow/blob/c65e2b72198de10319008b31dcf13d51509ccfde/dm/pkg/election/election.go#L200) is the kye to understand how the logical concept is continuous running.
3. **Third,** periodically, it'll recampaign leader of DM master instances and the leader'll **start** some components including `Scheduler`, `Pessimist` and `Optimist`, [more details](https://github.com/pingcap/tiflow/blob/c65e2b72198de10319008b31dcf13d51509ccfde/dm/master/election.go#L169).
4. **Fourth**, It also spilits task into subtasks which represents only one source in one migration task.

## Scheduler

1. **First**, Scheduler is part of Master, which's responsible for tasks of DM worker, such as `register/unregister`, `observe the online/offline`, `observe add/remove source config`, `schedule upstream sources`, `schedule data migration subtask` and so forth, more details at [here](https://github.com/pingcap/tiflow/blob/c65e2b72198de10319008b31dcf13d51509ccfde/dm/master/scheduler/scheduler.go#L44).  
2. **Second**, what scheduler actully does is that, on the one hand, some background gorountines are countinuous running after starting the master instance like [`observeWorkerEvent`](https://github.com/pingcap/tiflow/blob/c65e2b72198de10319008b31dcf13d51509ccfde/dm/master/scheduler/scheduler.go#L2081), on the other hand, the others will be triggered when dmctl or openAPI sends some operations, like: [`RemoveSourceCfg`](https://github.com/pingcap/tiflow/blob/c65e2b72198de10319008b31dcf13d51509ccfde/dm/master/scheduler/scheduler.go#L441). Mostly, the functions were embended in GRPC defining.

## pessimist

1. PTAL at the [shard-merge-pessimistic](https://docs.pingcap.com/zh/tidb-data-migration/v5.3/feature-shard-merge-pessimistic#%E5%AE%9E%E7%8E%B0%E5%8E%9F%E7%90%86). The [detail](https://github.com/pingcap/tiflow/blob/c65e2b72198de10319008b31dcf13d51509ccfde/dm/pkg/shardddl/pessimism/doc.go) of the sequence of coordinate a shard DDL lock. In short, what it's actually does is keeping every DML in a DM Cluster before a specific DDL timestamp, till the end of the DDL.
2. `LockKeeper` which encapsulates `Lock` used to keep and handle DDL lock conveniently, which doesn't need to be presistent. Lock represents the shard DDL lock in memory. This information also does not need to be persistent, and can be re-constructed from the shard DDL info. And, this strcut has a key founction named `TrySync`, which's to sync the lock by increase the number of remain, which number is equal to the number of sources.  

![pessimism](https://download.pingcap.com/images/tidb-data-migration/shard-ddl-flow.png)

## Optimist

1. LockKeeper used to keep and handle DDL lock conveniently. The logical function is equal to Lock in pessimism, just the different name instead of `Lock`.

![optimistic](https://download.pingcap.com/images/tidb-data-migration/optimistic-ddl-flow.png)
