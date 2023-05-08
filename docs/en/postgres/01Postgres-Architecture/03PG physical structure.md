# Physical Sttucture

1. fsm(free space map) : It's used to map how many free space blocks are there.
2. vm(visible map) : Mainly, the using scenario is accessed when there's a vaccum.

## Funcationality of tablespace

1. if there's more than on single physical disks, we can dispatch table storage path on different disks so that heavy I/O REQs could be able to run ASAP.

```sql
create tablesapce space1 location '/path/to/space_dir';
```
