# DM Master

## Election

1. **First**, It's a comman package which's been encapsulated to implment function of leader election based on etcd.
2. **Second**, [compaignLoop](https://github.com/pingcap/tiflow/blob/c65e2b72198de10319008b31dcf13d51509ccfde/dm/pkg/election/election.go#L200) is the kye to understand how the logical concept is continuous running.
3. **Third,** Periodically， it'll recampaign leader of DM master instances and the leader'll **start** some components including `Scheduler`, `Pessimist` and `Optimist`.
4. **Fourth**, It also spilits task into subtasks which represents only one source in one migration task.

## Scheduler

1. **First**, Scheduler is part of Master, which's responsible for tasks of DM worker, such as `register/unregister`, `observe the online/offline`, `observe add/remove source config`, `schedule upstream sources`, `schedule data migration subtask` and so forth, more details at [here](https://github.com/pingcap/tiflow/blob/c65e2b72198de10319008b31dcf13d51509ccfde/dm/master/scheduler/scheduler.go#L44).  
2. **Second**, what scheduler actully does is that, on the one hand, some background gorountines are countinuous running after starting the master instance like [`observeWorkerEvent`](https://github.com/pingcap/tiflow/blob/c65e2b72198de10319008b31dcf13d51509ccfde/dm/master/scheduler/scheduler.go#L2081), on the other hand, the others will be triggered when dmctl or openAPI sends some operations, like: [`RemoveSourceCfg`](https://github.com/pingcap/tiflow/blob/c65e2b72198de10319008b31dcf13d51509ccfde/dm/master/scheduler/scheduler.go#L441). Mostly, the functions were embended in GRPC defining.

## pessimist

1. The [concept](https://github.com/pingcap/tiflow/blob/c65e2b72198de10319008b31dcf13d51509ccfde/dm/pkg/shardddl/pessimism/doc.go) of the sequence of coordinate a shard DDL lock.

## Optimist
