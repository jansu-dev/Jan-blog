const tidbDocSideBar = [
    {text: "01TiDB-原理总结", items: [
            { text: "1-1论文阅读", items: [
                { text: "PaperIsolationLevels学习笔记.md", link: "/zh/tidb/01TiDB-原理总结/1-1论文阅读/PaperIsolationLevels学习笔记.md"},
                { text: "PaperLSMTree学习笔记.md", link: "/zh/tidb/01TiDB-原理总结/1-1论文阅读/PaperLSMTree学习笔记.md"},
                { text: "PaperPaxos学习笔记.md", link: "/zh/tidb/01TiDB-原理总结/1-1论文阅读/PaperPaxos学习笔记.md"},
                { text: "Theory-LSMTree存储.md", link: "/zh/tidb/01TiDB-原理总结/1-1论文阅读/Theory-LSMTree存储.md"},
                { text: "Theory-Percolator分布式事务.md", link: "/zh/tidb/01TiDB-原理总结/1-1论文阅读/Theory-Percolator分布式事务.md"},
                { text: "Theory-Spanner分布式事务.md", link: "/zh/tidb/01TiDB-原理总结/1-1论文阅读/Theory-Spanner分布式事务.md"},
            ] },
            { text: "1-2特性摘要", items: [
                { text: "TiDB存储引擎下MPP优劣.md", link: "/zh/tidb/01TiDB-原理总结/1-2特性摘要/TiDB存储引擎下MPP优劣.md"},
                { text: "TiDB存储模型的实现.md", link: "/zh/tidb/01TiDB-原理总结/1-2特性摘要/TiDB存储模型的实现.md"},
                { text: "TiDB悲观锁实现原理.md", link: "/zh/tidb/01TiDB-原理总结/1-2特性摘要/TiDB悲观锁实现原理.md"},
                { text: "TiDB架构原理摘要.md", link: "/zh/tidb/01TiDB-原理总结/1-2特性摘要/TiDB架构原理摘要.md"},
                { text: "TiKVRegion实现原理.md", link: "/zh/tidb/01TiDB-原理总结/1-2特性摘要/TiKVRegion实现原理.md"},
            ] },
            { text: "1-3组件原理", items: [
                { text: "Component-Etcd原理与使用.md", link: "/zh/tidb/01TiDB-原理总结/1-3组件原理/Component-Etcd原理与使用.md"},
                { text: "gRPC协议原理.md", link: "/zh/tidb/01TiDB-原理总结/1-3组件原理/gRPC协议原理.md"},
            ] },
    ] },
    {text: "02TIDB-部署实践", items: [
            { text: "2-1软硬件环境检测", items: [
                { text: "TiDB-集群部署前环境检测.md", link: "/zh/tidb/02TIDB-部署实践/2-1软硬件环境检测/TiDB-集群部署前环境检测.md"},
            ] },
            { text: "2-2Ansible部署实践", items: [
                { text: "TiDB-Ansible部署工具简介与TiDB集群部署.md", link: "/zh/tidb/02TIDB-部署实践/2-2Ansible部署实践/TiDB-Ansible部署工具简介与TiDB集群部署.md"},
                { text: "TiDB-PD集群Ansible方式节点扩容.md", link: "/zh/tidb/02TIDB-部署实践/2-2Ansible部署实践/TiDB-PD集群Ansible方式节点扩容.md"},
                { text: "TiDB-PD集群Ansible方式节点缩容.md", link: "/zh/tidb/02TIDB-部署实践/2-2Ansible部署实践/TiDB-PD集群Ansible方式节点缩容.md"},
                { text: "TiDB-TiDB集群Ansible方式节点扩容.md", link: "/zh/tidb/02TIDB-部署实践/2-2Ansible部署实践/TiDB-TiDB集群Ansible方式节点扩容.md"},
                { text: "TiDB-TiDB集群Ansible方式节点缩容.md", link: "/zh/tidb/02TIDB-部署实践/2-2Ansible部署实践/TiDB-TiDB集群Ansible方式节点缩容.md"},
                { text: "TiDB-TiKV集群Ansible方式节点扩容.md", link: "/zh/tidb/02TIDB-部署实践/2-2Ansible部署实践/TiDB-TiKV集群Ansible方式节点扩容.md"},
                { text: "TiDB-TiKV集群Ansible方式节点缩容.md", link: "/zh/tidb/02TIDB-部署实践/2-2Ansible部署实践/TiDB-TiKV集群Ansible方式节点缩容.md"},
                { text: "TiDB-中控机Ansible部署修改集群配置滚动升级.md", link: "/zh/tidb/02TIDB-部署实践/2-2Ansible部署实践/TiDB-中控机Ansible部署修改集群配置滚动升级.md"},
            ] },
            { text: "2-3TiUP部署实践", items: [
                { text: "TiDB-TiSpark依靠TiUP工具协助部署集群.md", link: "/zh/tidb/02TIDB-部署实践/2-3TiUP部署实践/TiDB-TiSpark依靠TiUP工具协助部署集群.md"},
                { text: "TiDB-TiUP工具集群扩缩容TiDB、TiKV、PD.md", link: "/zh/tidb/02TIDB-部署实践/2-3TiUP部署实践/TiDB-TiUP工具集群扩缩容TiDB、TiKV、PD.md"},
                { text: "TiDB-TiUP工具集群滚动升级.md", link: "/zh/tidb/02TIDB-部署实践/2-3TiUP部署实践/TiDB-TiUP工具集群滚动升级.md"},
                { text: "TiDB-TiUP工具集群离线部署方案.md", link: "/zh/tidb/02TIDB-部署实践/2-3TiUP部署实践/TiDB-TiUP工具集群离线部署方案.md"},
                { text: "TiDB-TiUP集成套件工具原理与使用笔记.md", link: "/zh/tidb/02TIDB-部署实践/2-3TiUP部署实践/TiDB-TiUP集成套件工具原理与使用笔记.md"},
                { text: "TiDB-单机多TiKV实例、多TiDB实例部署.md", link: "/zh/tidb/02TIDB-部署实践/2-3TiUP部署实践/TiDB-单机多TiKV实例、多TiDB实例部署.md"},
            ] },
            { text: "2-4基准测试与压力测试", items: [
                { text: "sysbench基准测试.md", link: "/zh/tidb/02TIDB-部署实践/2-4基准测试与压力测试/sysbench基准测试.md"},
            ] },
    ] },
    {text: "03TiDB-运维管理", items: [
            { text: "3-1基础运维管理", items: [
                { text: "TiDB-TLS加密传输安全协议原理与应用.md", link: "/zh/tidb/03TiDB-运维管理/3-1基础运维管理/TiDB-TLS加密传输安全协议原理与应用.md"},
                { text: "TiDB-主键自增.md", link: "/zh/tidb/03TiDB-运维管理/3-1基础运维管理/TiDB-主键自增.md"},
                { text: "TiDB-基于RBAC的权限管理.md", link: "/zh/tidb/03TiDB-运维管理/3-1基础运维管理/TiDB-基于RBAC的权限管理.md"},
                { text: "TiDB-常见运维问题整理.md", link: "/zh/tidb/03TiDB-运维管理/3-1基础运维管理/TiDB-常见运维问题整理.md"},
                { text: "TiDB-热点问题排查与处理.md", link: "/zh/tidb/03TiDB-运维管理/3-1基础运维管理/TiDB-热点问题排查与处理.md"},
            ] },
            { text: "3-2常规备份恢复", items: [
                { text: "TiDB-4版本至5版本升级与回退.md", link: "/zh/tidb/03TiDB-运维管理/3-2常规备份恢复/TiDB-4版本至5版本升级与回退.md"},
            ] },
            { text: "3-3非常规恢复", items: [
                { text: "重建PD.md", link: "/zh/tidb/03TiDB-运维管理/3-3非常规恢复/重建PD.md"},
            ] },
    ] },
    {text: "04TiDB-版本特性", items: [
            { text: "4-1版本特性", items: [
                { text: "TiDB-5.0.0-rc 新特性.md", link: "/zh/tidb/04TiDB-版本特性/4-1版本特性/TiDB-5.0.0-rc 新特性.md"},
            ] },
    ] },
    {text: "05TiDB-调优实践", items: [
            { text: "5-1TiDB-监控信息", items: [
                { text: "Promethus01.jpeg", link: "/zh/tidb/05TiDB-调优实践/5-1TiDB-监控信息/Promethus01.jpeg"},
                { text: "TiDB-Grafana定位TiDB实例状态.md", link: "/zh/tidb/05TiDB-调优实践/5-1TiDB-监控信息/TiDB-Grafana定位TiDB实例状态.md"},
                { text: "TiDB-prometheus对OOM无法识别.md", link: "/zh/tidb/05TiDB-调优实践/5-1TiDB-监控信息/TiDB-prometheus对OOM无法识别.md"},
                { text: "TiDB-问题识别与参数调优全景图.md", link: "/zh/tidb/05TiDB-调优实践/5-1TiDB-监控信息/TiDB-问题识别与参数调优全景图.md"},
                { text: "prometheus_for.jpeg", link: "/zh/tidb/05TiDB-调优实践/5-1TiDB-监控信息/prometheus_for.jpeg"},
            ] },
            { text: "5-2TiDB-参数调优", items: [
                { text: "TIDB集群系统变量推荐设置.md", link: "/zh/tidb/05TiDB-调优实践/5-2TiDB-参数调优/TIDB集群系统变量推荐设置.md"},
                { text: "TiDB集群PD配置文件推荐设置.md", link: "/zh/tidb/05TiDB-调优实践/5-2TiDB-参数调优/TiDB集群PD配置文件推荐设置.md"},
                { text: "TiDB集群TiDB配置文件推荐设置.md", link: "/zh/tidb/05TiDB-调优实践/5-2TiDB-参数调优/TiDB集群TiDB配置文件推荐设置.md"},
                { text: "TiDB集群TiKV配置文件推荐设置.md", link: "/zh/tidb/05TiDB-调优实践/5-2TiDB-参数调优/TiDB集群TiKV配置文件推荐设置.md"},
                { text: "推荐部署参数调优设置v5.md", link: "/zh/tidb/05TiDB-调优实践/5-2TiDB-参数调优/推荐部署参数调优设置v5.md"},
            ] },
            { text: "5-3TiDB-SQL调优", items: [
                { text: "INDEX管理专项.md", link: "/zh/tidb/05TiDB-调优实践/5-3TiDB-SQL调优/INDEX管理专项.md"},
                { text: "SQL 语句专项.md", link: "/zh/tidb/05TiDB-调优实践/5-3TiDB-SQL调优/SQL 语句专项.md"},
                { text: "TiDB 统计信息.md", link: "/zh/tidb/05TiDB-调优实践/5-3TiDB-SQL调优/TiDB 统计信息.md"},
            ] },
            { text: "5-4TiDB-生产案例", items: [
                { text: "CASE-导入100万左右数据中断问题.md", link: "/zh/tidb/05TiDB-调优实践/5-4TiDB-生产案例/CASE-导入100万左右数据中断问题.md"},
                { text: "CASE-热点问题识别与解决方案.md", link: "/zh/tidb/05TiDB-调优实践/5-4TiDB-生产案例/CASE-热点问题识别与解决方案.md"},
                { text: "CASE-磁盘抖动导致Duration抖动现象问题.md", link: "/zh/tidb/05TiDB-调优实践/5-4TiDB-生产案例/CASE-磁盘抖动导致Duration抖动现象问题.md"},
                { text: "CASE-网卡带宽打满导致Duration升高问题.md", link: "/zh/tidb/05TiDB-调优实践/5-4TiDB-生产案例/CASE-网卡带宽打满导致Duration升高问题.md"},
                { text: "CASE-非SSD磁盘性能引发txnLockNotFound问题.md", link: "/zh/tidb/05TiDB-调优实践/5-4TiDB-生产案例/CASE-非SSD磁盘性能引发txnLockNotFound问题.md"},
            ] },
            { text: "5-5TiDB-常见错误", items: [
                { text: "TiDB-4.0.9版本开始tiflash组件弃用path警告问题.md", link: "/zh/tidb/05TiDB-调优实践/5-5TiDB-常见错误/TiDB-4.0.9版本开始tiflash组件弃用path警告问题.md"},
                { text: "TiDB-handshake failed问题解决.md", link: "/zh/tidb/05TiDB-调优实践/5-5TiDB-常见错误/TiDB-handshake failed问题解决.md"},
            ] },
    ] },
    {text: "06TiDB-生态工具", items: [
            { text: "6-1TiCDC", items: [
                { text: "TiCDC-01-简述使用背景.md", link: "/zh/tidb/06TiDB-生态工具/6-1TiCDC/TiCDC-01-简述使用背景.md"},
                { text: "TiCDC-02-剖析架构模型.md", link: "/zh/tidb/06TiDB-生态工具/6-1TiCDC/TiCDC-02-剖析架构模型.md"},
                { text: "TiCDC-03-CDC组件解析.md", link: "/zh/tidb/06TiDB-生态工具/6-1TiCDC/TiCDC-03-CDC组件解析.md"},
                { text: "TiCDC-04-监控原理解析.md", link: "/zh/tidb/06TiDB-生态工具/6-1TiCDC/TiCDC-04-监控原理解析.md"},
            ] },
            { text: "6-2TiDB-TiSpark", items: [
                { text: "TiDB-Spark.md", link: "/zh/tidb/06TiDB-生态工具/6-2TiDB-TiSpark/TiDB-Spark.md"},
                { text: "TiDB-Spark工作原理.md", link: "/zh/tidb/06TiDB-生态工具/6-2TiDB-TiSpark/TiDB-Spark工作原理.md"},
                { text: "TiDB-TiSpark OOM问题.md", link: "/zh/tidb/06TiDB-生态工具/6-2TiDB-TiSpark/TiDB-TiSpark OOM问题.md"},
            ] },
    ] },
    {text: "07TiDB-解决方案", items: [
            { text: "7-1TiDB-Binlog读写分离方案", items: [
                { text: "binlog潜在风险.md", link: "/zh/tidb/07TiDB-解决方案/7-1TiDB-Binlog读写分离方案/binlog潜在风险.md"},
            ] },
            { text: "7-2TiDB优势技术方向与场景", items: [
                { text: "优势场景.md", link: "/zh/tidb/07TiDB-解决方案/7-2TiDB优势技术方向与场景/优势场景.md"},
            ] },
            { text: "7-3TiDB或MySQL迁移工具", items: [
                { text: "Kettle使用手册.pdf", link: "/zh/tidb/07TiDB-解决方案/7-3TiDB或MySQL迁移工具/Kettle使用手册.pdf"},
                { text: "tidb-binlog同步方案.md", link: "/zh/tidb/07TiDB-解决方案/7-3TiDB或MySQL迁移工具/tidb-binlog同步方案.md"},
            ] },
            { text: "7-4两地三中心高可用方案", items: [
                { text: "TiDB-容灾部署知识点归纳.md", link: "/zh/tidb/07TiDB-解决方案/7-4两地三中心高可用方案/TiDB-容灾部署知识点归纳.md"},
            ] },
            { text: "7-5迁移MyCat至TiDB方案", items: [
                { text: "TiChange-Shell脚本转换csv文件适配tidb-lightning.md", link: "/zh/tidb/07TiDB-解决方案/7-5迁移MyCat至TiDB方案/TiChange-Shell脚本转换csv文件适配tidb-lightning.md"},
                { text: "某系统OLAP为主OLTP为辅系统下迁TiDB.md", link: "/zh/tidb/07TiDB-解决方案/7-5迁移MyCat至TiDB方案/某系统OLAP为主OLTP为辅系统下迁TiDB.md"},
            ] },
            { text: "7-6迁移Oracle至TiDB方案", items: [
                { text: "Oracle到TiDB的OGG部署方案.md", link: "/zh/tidb/07TiDB-解决方案/7-6迁移Oracle至TiDB方案/Oracle到TiDB的OGG部署方案.md"},
                { text: "Oracle系统下迁方式总结.md", link: "/zh/tidb/07TiDB-解决方案/7-6迁移Oracle至TiDB方案/Oracle系统下迁方式总结.md"},
            ] },
    ] },
    {text: "08TiDB-源码阅读", items: [
            { text: "8-1TiDB", items: [
                { text: "01-TiDB内核-源码解读Point_Get点查的一生.md", link: "/zh/tidb/08TiDB-源码阅读/8-1TiDB/01-TiDB内核-源码解读Point_Get点查的一生.md"},
                { text: "Lex & Yacc concept and goyacc practice.md", link: "/zh/tidb/08TiDB-源码阅读/8-1TiDB/Lex & Yacc concept and goyacc practice.md"},
                { text: "TiDB-Centos构建Debug环境.md", link: "/zh/tidb/08TiDB-源码阅读/8-1TiDB/TiDB-Centos构建Debug环境.md"},
                { text: "TiDB-Session Component Debugging and Not.md", link: "/zh/tidb/08TiDB-源码阅读/8-1TiDB/TiDB-Session Component Debugging and Not.md"},
                { text: "TiDB-TiClient交互流程理解.md", link: "/zh/tidb/08TiDB-源码阅读/8-1TiDB/TiDB-TiClient交互流程理解.md"},
                { text: "TiDB-TiDB源码executer部分理解.md", link: "/zh/tidb/08TiDB-源码阅读/8-1TiDB/TiDB-TiDB源码executer部分理解.md"},
                { text: "TiDB-go tool pprof 分析 debug 信息.md", link: "/zh/tidb/08TiDB-源码阅读/8-1TiDB/TiDB-go tool pprof 分析 debug 信息.md"},
                { text: "TiDB-启动流程之注册 KV 驱动与 Store.md", link: "/zh/tidb/08TiDB-源码阅读/8-1TiDB/TiDB-启动流程之注册 KV 驱动与 Store.md"},
            ] },
    ] }
]


const sqlServerZHDocSideBar = [{
    text: '高可用部署',
    items: [
        { text: 'Always on 部署', link: '/zh/sqlserver/AlwaysOn集群部署.md' },
]
}
]

const languageDropDown = {
    text: "Languages",
    items: [
      { text: "简体中文", link: "/zh/index" },
      { text: "English", link: "/en/index" }
    ]
  }

  const englishENDocSidebar = [{
    text: '02oral_english',
    items: [
        { text: '2-1scenario_speedfriending', link: '/en/english/02oral_english/2-1scenario_speedfriending.md' },
        { text: '2-2scenario_celebrity', link: '/en/english/02oral_english/2-2scenario_celebrity' },
    ]
}]

const englishZHDocSidebar = [{
    text: '02英语口语',
    items: [
        { text: '2-2场景_名人', link: '/zh/english/02英语口语/2-2场景_名人.md' },
    ]
}]

const oracleZHDocSidebar = [{
    text: '镜像地址',
    items: [
        { text: '所有镜像', link: '/zh/oracle/Summary-历史镜像梳理.md' },
    ]
},
{
    text: '搭建部署',
    items: [
        { text: 'Oracle Rac 11g', link: '/zh/oracle/Start-OracleRAC.md' },
        { text: 'Oracle DG 11g', link: '/zh/oracle/Start-DG.md' },
        { text: '单机 ASM 静默安装 11g', link: '/zh/oracle/Start-Oracle单实例ASM部署.md' },
    ]
},
{
    text: '理论概念',
    items: [
        { text: 'DG 概念简介', link: '/zh/oracle/Theory-Oracle DG.md' },
    ]
}
]

export default {  
    locales: {
        '/': {
            lang: 'en-US',
            title: 'Jan-Blog-EN',
        },
        '/zh/': {
            lang: 'zh-CN',
            title: 'Jan-Blog-CN',
        }
    },
    themeConfig: {
        logo: '/logo.png',
        locales: {
            '/': {
                nav: [
                    { text: 'Home', link: '/en/index'},
                    { text: 'Introduction', link: '/en/about/contact'},
                    { text: 'TiDB Notes', link: '/en/tidb/index'},
                    { text: 'Oracle Notes', link: '/en/oracle/index'},
                    { text: 'SQL Server Notes', link: '/en/sqlserver/index'},
                    { text: 'English Notes', link: '/en/english/index'},
                    languageDropDown
                    ],
                socialLinks: [
                    { icon: "github", link: "https://github.com/jansu-dev/Jan-Blog" },
                    { icon: "linkedin", link: "https://www.linkedin.com/in/zhipeng-su-2282b3217/"},
                    { icon: "youtube", link: "https://space.bilibili.com/318184941?spm_id_from=333.788.0.0"}
                ],
                sidebar: {
                      '/en/tidb/': tidbDocSideBar,
                      '/en/english': englishENDocSidebar
                  },
            },
            '/zh/': {
                nav: [
                    { text: '首页', link: '/zh/index'},
                    { text: '主人简介', link: '/zh/about/contact'},
                    { text: 'TiDB 笔记资料', link: '/zh/tidb/index'},
                    { text: 'Oracle 笔记资料', link: '/zh/oracle/Summary-历史镜像梳理.md'},
                    { text: 'SQL Server 笔记资料', link: '/zh/sqlserver/AlwaysOn集群部署.md'},
                    { text: '英语学习笔记', link: '/zh/english/index'},
                    languageDropDown
                ],
                socialLinks: [
                    { icon: "github", link: "https://github.com/jansu-dev/Jan-Blog" },
                    { icon: "linkedin", link: "https://www.linkedin.com/in/zhipeng-su-2282b3217/"},
                    { icon: "youtube", link: "https://space.bilibili.com/318184941?spm_id_from=333.788.0.0"}
                ],
                sidebar: {
                    '/zh/tidb/': tidbDocSideBar,
                    '/zh/oracle/': oracleZHDocSidebar,
                    '/zh/sqlserver/': sqlServerZHDocSideBar,
                    '/zh/english/': englishZHDocSidebar
                },
            }
        }
    }
}
  

