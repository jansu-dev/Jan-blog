# TiDB-Lighting Architecture

## Overview

If you wanna some older things or designs about [TiDB-Lighting](https://github.com/pingcap/tidb-lightning), and now It's been merged into [BR as the part of  TiDB repo](https://github.com/pingcap/tidb/tree/master/br/cmd/tidb-lightning).

Also tidb-lightning can be divided into two parts frontend and backend.

<!-- ![]() -->

1. Startup Chain : main() --> app.RunOnceWithOptions --> lightning.run --> restore.NewRestoreController --> Controller.run. Inside the `run` function, every Options'll be executed steps by steps including a range of things code block below.

    ```go
    opts := []func(context.Context) error{
    rc.setGlobalVariables,
    rc.restoreSchema,
    rc.preCheckRequirements,
    rc.initCheckpoint,
    rc.restoreTables,
    rc.fullCompact,
    rc.cleanCheckpoints,
    }
    ```

2. Let's get started deeply on `preCheckRequirements`, `initCheckpoint`, `restoreTables` and `fullCompact`. Because, IMHO, It's the most useful for me/us to unsterstand how it works.

## Main Steps

1. For `preCheckRequirements`,

2. For `initCheckpoint`,

    * [type DB interface](https://github.com/pingcap/tidb/blob/eb35c773b512e4e00c42caf7f04ea7397d00c127/br/pkg/lightning/checkpoints/checkpoints.go#L511) is a key interface to be familiar with what functions the checkpoint have.

3. For `restoreTables`, in short, it's the most important, pivotal to see how lightning does restore and responsible for somethings like `init concurrent thread pools`, `pause schedulers in PD`, `Restore engines` and so forth.

    * The two parameters including table-concurrency and index-concurrency can take effect in both tidb-bakcend and local-backend mode.  
        * table-concurrency : represent how many threads to import **table data** parallely inside the [Controller.restoreTables](https://github.com/pingcap/tidb/blob/eb35c773b512e4e00c42caf7f04ea7397d00c127/br/pkg/lightning/restore/restore.go#L1440).  
        * index-concurrency : the same as `table-concurrency` just serving for index parallely.
    * If in local-backend mode, there're a couple of special operations needed to be done and compared with tidb-backend mode, **firstly**, [pauses schedulers](https://github.com/pingcap/tidb/blob/eb35c773b512e4e00c42caf7f04ea7397d00c127/br/pkg/lightning/restore/restore.go#L1468-L1475) existing in PD. And there's a tune named `CanPauseSchedulerByKeyRange`, after v6.1.0 version, which detects whether the scheduler can pause by the key range. If not, all existed schedulers in pd are gonna be deleted and saved in tidb-lightning, untill everthing is ok or tidb-lightning crashs, it'll be restored. **Secondly**, disables GC of tidb cluster by calling `tikv://PdAddr?disableGC=true`. **Thirdly**, builds a checksum handler encapsulated a db connection inside.  
    * The other logics inside the function are being shared by two tidb or local beckend mode. Builds threads in the number of `index-concurrency` to receive index tasks and in the same way to receive table tasks with `table-concurrency`. Every task including two key info `TableRestore` and `Checkpoint` will be constructed by looping every table in meta, be put to allTasks channel and be processed by the two pools.
    * [`populateChunks`](https://github.com/pingcap/tidb/blob/eb35c773b512e4e00c42caf7f04ea7397d00c127/br/pkg/lightning/restore/table_restore.go#L97) will split source files into region size in the concurrency of Max(region-concurrency, 2). In short there's an inside [fun MarkTableRegion](https://github.com/pingcap/tidb/blob/eb35c773b512e4e00c42caf7f04ea7397d00c127/br/pkg/lightning/mydump/region.go#L149) belonged to MyDump, which's responsible for creating a new source file region. **So, if your sourfile is very big, It'll have a bad impact on concurrent executing**. In this case, a warn message will be here called `file is too big to be processed efficiently; we suggest splitting it at 256 MB each ...`.
    * There're some some special and important processes all named postProcess needed to execute rebase-auto-id/checksum/analyze according to the task config inside the [func Controller.restoreTables](https://github.com/pingcap/tidb/blob/eb35c773b512e4e00c42caf7f04ea7397d00c127/br/pkg/lightning/restore/restore.go#L1574-L1584). Untill all engines are already restored, the postProcesses will be executed in `table-concurrency` concurrently.

4. For `fullCompact`,

## Parameters
