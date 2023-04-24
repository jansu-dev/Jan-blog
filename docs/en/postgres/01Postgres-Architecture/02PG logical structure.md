# PG Logical Structure

## Synopsis

Well, as the first sentence of `PostgreSQL is an object-relational database management system (ORDBMS)...` said on the first DOC page. It look everything as an object.

## Concepts In PG

1. **oid**: oid as a type is a 32-bit unsigned integer that stands for object id. Actually, it means an unique identifer of every object. As mentioned before, PG treates every thing as object, so based on the one to be able to orgnaize object relationship in internal views.

## Logical Structure

1. Logical relationship : Database Cluster（instance） --> Database --> Schema --> Objects(Table)-->Tuples
2. Physical relationship : Database Cluster --> Tablespaces --> Files --> Blocks
3. The relationship between logical and physical, and the others ignored in the code block are listed [here](https://www.postgresql.org/docs/15/storage-file-layout.html).

    ```shell
    $PGDATA/
        |-- global/
        |-- pg_logical/
        |-- pg_stat/
        |-- pg_tblspc/
        |-- ...

    test=# \! ls -l $(psql -t test -c "select setting  from pg_settings where name = 'data_directory'")/base;
    total 0
    drwx------  291 jan  admin  9312 Jan 29 00:46 1
    drwx------  291 jan  admin  9312 Jan 29 00:46 13729
    drwx------  292 jan  admin  9344 Apr 24 11:51 13730
    drwx------  292 jan  admin  9344 Apr 24 11:50 16387
    drwx------  293 jan  admin  9376 Apr 24 14:31 16594
    ```

```sql
postgres=# create database test;
postgres=# \c test
test=# create table jan(id int,name varchar(20));
test=# select oid,relname,relnamespace from pg_class where relname='jan';
  oid  | relname | relnamespace
-------+---------+--------------
 16595 | jan     |         2200
(1 row)

test=# \! ls $(psql -t postgres -c "select setting  from pg_settings where name = 'data_directory'")/base | tr '\n' ',' | sed 's/.$/);\n/' | sed 's/^/select * from pg_database where oid in (&/' | psql -Tt postgres
  oid  |  datname  | datdba | encoding | datcollate | datctype | datistemplate | datallowconn | datconnlimit | datlastsysoid | datfrozenxid | datminmxid | dattablespace |        datacl
-------+-----------+--------+----------+------------+----------+---------------+--------------+--------------+---------------+--------------+------------+---------------+----------------------
 13730 | postgres  |     10 |        6 | C          | C        | f             | t            |           -1 |         13729 |          478 |          1 |          1663 |
     1 | template1 |     10 |        6 | C          | C        | t             | t            |           -1 |         13729 |          478 |          1 |          1663 | {=c/jan,jan=CTc/jan}
 13729 | template0 |     10 |        6 | C          | C        | t             | f            |           -1 |         13729 |          478 |          1 |          1663 | {=c/jan,jan=CTc/jan}
 16387 | discourse |  16386 |        6 | C          | C        | f             | t            |           -1 |         13729 |          478 |          1 |          1663 |
 16594 | test      |     10 |        6 | C          | C        | f             | t            |           -1 |         13729 |          478 |          1 |          1663 |
```

## Important Dictionary

1. `pg_catalog.pg_databases`

\set oids `ls $(psql -t postgres -c "select setting  from pg_settings where name = 'data_directory'")/base | tr '\n' ',' | sed 's/.$/)/' | sed 's/^/(&/'` \gexec select * from pg_database where oid in :oids;