const tidbDocSideBar = [
    {text: "01TiDB-原理总结", items: [
            { text: "1-1论文阅读", items: [
                { text: "01Percolator 分布式事务.md", link: "/zh/tidb/01TiDB-原理总结/1-1论文阅读/01Percolator 分布式事务.md"},
                { text: "02PaperPaxos 论文简读.md", link: "/zh/tidb/01TiDB-原理总结/1-1论文阅读/02PaperPaxos 论文简读.md"},
                { text: "03Spanner 分布式事务.md", link: "/zh/tidb/01TiDB-原理总结/1-1论文阅读/03Spanner 分布式事务.md"},
                { text: "04LSMTree 存储笔记.md", link: "/zh/tidb/01TiDB-原理总结/1-1论文阅读/04LSMTree 存储笔记.md"},
                { text: "05数据库的隔离级别.md", link: "/zh/tidb/01TiDB-原理总结/1-1论文阅读/05数据库的隔离级别.md"},
            ] },
            {
                text: "123", items: [
                    { text: "02physical Optimizing in TiDB", link: "/en/tidb/01TiDB-原理总结/1-2TiDB Optimizer/02physical Optimizing in TiDB.md"}
                ]
            }
    ] },
    {text: "02TIDB-部署实践", items: [
            { text: "2-1Ansible 部署实践", items: [
                { text: "01TiDB-Ansible 部署与扩缩容.md", link: "/zh/tidb/02TIDB-部署实践/2-1Ansible 部署实践/01TiDB-Ansible 部署与扩缩容.md"},
                { text: "02TiDB-Ansible 修改集群配置.md", link: "/zh/tidb/02TIDB-部署实践/2-1Ansible 部署实践/02TiDB-Ansible 修改集群配置.md"},
            ] },
            { text: "2-2TiUP 部署实践", items: [
                { text: "01TTiUP 离线部署 TiDB Cluster.md", link: "/zh/tidb/02TIDB-部署实践/2-2TiUP 部署实践/01TTiUP 离线部署 TiDB Cluster.md"},
                { text: "02TiUP 扩缩容 TiDB、TiKV、PD.md", link: "/zh/tidb/02TIDB-部署实践/2-2TiUP 部署实践/02TiUP 扩缩容 TiDB、TiKV、PD.md"},
                { text: "03TiUP 滚动升级 TiDB Cluster.md", link: "/zh/tidb/02TIDB-部署实践/2-2TiUP 部署实践/03TiUP 滚动升级 TiDB Cluster.md"},
                { text: "04TiUP 单机混部多实例.md", link: "/zh/tidb/02TIDB-部署实践/2-2TiUP 部署实践/04TiUP 单机混部多实例.md"},
                { text: "05TiUP 部署 TiSpark.md", link: "/zh/tidb/02TIDB-部署实践/2-2TiUP 部署实践/05TiUP 部署 TiSpark.md"},
            ] },
    ] },
    {text: "03TiDB-运维管理", items: [
            { text: "3-1基础运维管理", items: [
                { text: "TLS 加密传输原理与应用.md", link: "/zh/tidb/03TiDB-运维管理/3-1基础运维管理/TLS 加密传输原理与应用.md"},
            ] },
            { text: "3-2常规备份恢复", items: [
                { text: "01版本升级与回退.md", link: "/zh/tidb/03TiDB-运维管理/3-2常规备份恢复/01版本升级与回退.md"},
            ] },
            { text: "3-3非常规恢复", items: [
                { text: "01重建PD.md", link: "/zh/tidb/03TiDB-运维管理/3-3非常规恢复/01重建PD.md"},
            ] },
    ] },
    {text: "04TiDB-调优实践", items: [
            { text: "4-1生产案例总结", items: [
                { text: "01磁盘抖动导致 Duration 抖动.md", link: "/zh/tidb/04TiDB-调优实践/4-1生产案例总结/01磁盘抖动导致 Duration 抖动.md"},
                { text: "02网卡打满导致 Duration 升高.md", link: "/zh/tidb/04TiDB-调优实践/4-1生产案例总结/02网卡打满导致 Duration 升高.md"},
            ] },
    ] },
    {text: "05TiDB-生态工具", items: [
            { text: "5-1TiCDC", items: [
                { text: "01-简述使用背景.md", link: "/zh/tidb/05TiDB-生态工具/5-1TiCDC/01-简述使用背景.md"},
                { text: "02-剖析架构模型.md", link: "/zh/tidb/05TiDB-生态工具/5-1TiCDC/02-剖析架构模型.md"},
                { text: "03-CDC组件解析.md", link: "/zh/tidb/05TiDB-生态工具/5-1TiCDC/03-CDC组件解析.md"},
                { text: "TiCDC-04-监控原理解析.md", link: "/zh/tidb/05TiDB-生态工具/5-1TiCDC/TiCDC-04-监控原理解析.md"},
            ] },
            { text: "5-3Dumpling", items: [
                { text: "01Dumpling原理与使用.md", link: "/zh/tidb/05TiDB-生态工具/5-3Dumpling/01Dumpling原理与使用.md"},
            ] },
            { text: "5-4DM", items: [
                { text: "TiDB-DM工具原理与使用.md", link: "/zh/tidb/05TiDB-生态工具/5-4DM/TiDB-DM工具原理与使用.md"},
            ] },
            { text: "5-6Binlog", items: [
                { text: "01Binlog及Reparo原理与使用.md", link: "/zh/tidb/05TiDB-生态工具/5-6Binlog/01Binlog及Reparo原理与使用.md"},
            ] },
    ] },
    {text: "06TiDB-解决方案", items: [
            { text: "6-1迁移MyCat至TiDB方案", items: [
                { text: "01TiChange脚本转换csv文件适配tidb-lightning.md", link: "/zh/tidb/06TiDB-解决方案/6-1迁移MyCat至TiDB方案/01TiChange脚本转换csv文件适配tidb-lightning.md"},
            ] },
            { text: "6-2迁移Oracle至TiDB方案", items: [
                { text: "01Oracle到TiDB的OGG部署方案.md", link: "/zh/tidb/06TiDB-解决方案/6-2迁移Oracle至TiDB方案/01Oracle到TiDB的OGG部署方案.md"},
            ] },
    ] },
    {text: "07TiDB-源码阅读", items: [
            { text: "8-1TiDB", items: [
                { text: "01TiDB run and debug on M1.md", link: "/zh/tidb/07TiDB-源码阅读/8-1TiDB/01TiDB run and debug on M1.md"},
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
        { text: '2-3scernaio_comment', link: '/en/english/02oral_english/2-3scernaio_comment.md' },
    ]
}]

const englishZHDocSidebar = [{
    text: '02英语口语',
    items: [
        { text: '2-2场景_名人', link: '/zh/english/02英语口语/2-2场景_名人.md' },
        { text: '2-3场景_备注', link: '/zh/english/02英语口语/2-3场景_备注.md' },
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
  

