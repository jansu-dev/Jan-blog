# Metrics

## Overview

## operate error

## HA

## task

## load dump files

## binlog replication

1. remaining time to sync  

2. replicate lag  
    **a. Meaning** : The latency time it takes to replicate the binlog from master to Syncer (in seconds)  
    **b. Colculation** : In this [func updateReplicationLagMetric](https://github.com/pingcap/tiflow/blob/c65e2b72198de10319008b31dcf13d51509ccfde/dm/syncer/syncer.go#L890), the metric is updated by ticking per 100ms. the `lag` is calculated in an expression of `time.Now().Unix() - s.tsOffset.Load() - headerTS`. which `tsOffset` represents time range between upstream and syncer, DM's timestamp - MySQL's timestamp, and `headerTS` is minior timestamp,which is binlog `EventHeader Timestamp` parsed by [go-mysql-org/go-mysql/replication](https://github.com/go-mysql-org/go-mysql/tree/master/replication), of every DM worker MySQL.  

## relay log
