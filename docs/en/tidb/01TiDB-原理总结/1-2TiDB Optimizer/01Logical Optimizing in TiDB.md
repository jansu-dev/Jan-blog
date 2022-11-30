



## First of all

Actually, every logical rule struct has a method named `optimize()`


## rules of logical

From [here](https://github.com/pingcap/tidb/blob/17fac8bc2883dd287481a60f019beae948191a47/planner/core/optimizer.go#L597), we can see logical optimizing items will be applied on by one.  
```go
var optRuleList = []logicalOptRule{
	&gcSubstituter{},
	&columnPruner{},
	&resultReorder{},
	&buildKeySolver{},
	&decorrelateSolver{},
	&semiJoinRewriter{},
	&aggregationEliminator{},
	&skewDistinctAggRewriter{},
	&projectionEliminator{},
	&maxMinEliminator{},
	&ppdSolver{},
	&outerJoinEliminator{},
	&partitionProcessor{},
	&collectPredicateColumnsPoint{},
	&aggregationPushDownSolver{},
	&pushDownTopNOptimizer{},
	&syncWaitStatsLoadPoint{},
	&joinReOrderSolver{},
	&columnPruner{}, // column pruning again at last, note it will mess up the results of buildKeySolver
}
```

## gcSubstituter

By [mysql reference](https://dev.mysql.com/doc/refman/8.0/en/generated-column-index-optimizations.html) of `Generated Column(in short: gc)`, 


## columnPruner

