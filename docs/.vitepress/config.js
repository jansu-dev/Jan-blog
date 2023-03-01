import tidbDocZhSideBar from './sidebar_tidb_zh.js';
import tidbDocEnSideBar from './sidebar_tidb_en.js';
import englishDocEnSideBar from './sidebar_english_en.js';
import englishDocZhSideBar from './sidebar_english_zh.js';

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
    text: '01basic_english',
    items: [
        { text: '1-1scenario_lives', link: '/en/english/01basic_english/1-1scenario_lives.md' },
        { text: '1-2scenario_socializing', link: '/en/english/01basic_english/1-2scenario_socializing.md' },
        { text: '1-3scenario_materialworld', link: '/en/english/01basic_english/1-3scenario_materialworld.md' },
        { text: '1-4scenario_trends', link: '/en/english/01basic_english/1-4scenario_trends.md' },
        { text: '1-5scernaio_problemsolving', link: '/en/english/01basic_english/1-5scernaio_problemsolving.md' },
        { text: '1-6scenario_behavior', link: '/en/english/01basic_english/1-6scenario_behavior.md' },
        { text: '1-7scenario_careers', link: '/en/english/01basic_english/1-7scenario_careers.md' },
    ]
    },
    {
    text: '02oral_english',
    items: [
        { text: '2-1scenario_speedfriending', link: '/en/english/02oral_english/2-1scenario_speedfriending.md' },
        { text: '2-2scenario_celebrity', link: '/en/english/02oral_english/2-2scenario_celebrity' },
        { text: '2-3scernaio_comment', link: '/en/english/02oral_english/2-3scernaio_comment.md' },
        { text: '2-4scernaio_stories', link: '/en/english/02oral_english/2-4scernaio_stories.md' }
    ]}
]

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
                    { text: 'Community', link: 'http://forum.dbnest.net'},
                    { text: 'English Notes', link: '/en/english/index'},
                    languageDropDown
                    ],
                socialLinks: [
                    { icon: "github", link: "https://github.com/jansu-dev/Jan-Blog" },
                    { icon: "linkedin", link: "https://www.linkedin.com/in/zhipeng-su-2282b3217/"},
                    { icon: "youtube", link: "https://space.bilibili.com/318184941?spm_id_from=333.788.0.0"}
                ],
                sidebar: {
                      '/en/tidb/': tidbDocEnSideBar,
                      '/en/english/': englishDocEnSideBar
                  },
            },
            '/zh/': {
                nav: [
                    { text: '首页', link: '/zh/index'},
                    { text: '主人简介', link: '/zh/about/contact'},
                    { text: 'TiDB 笔记资料', link: '/zh/tidb/index'},
                    { text: 'Oracle 笔记资料', link: '/zh/oracle/Summary-历史镜像梳理.md'},
                    { text: 'SQL Server 笔记资料', link: '/zh/sqlserver/AlwaysOn集群部署.md'},
                    { text: 'DB 讨论区', link: 'http://forum.dbnest.net/categories'},
                    { text: '英语学习笔记', link: '/zh/english/index'},
                    languageDropDown
                ],
                socialLinks: [
                    { icon: "github", link: "https://github.com/jansu-dev/Jan-Blog" },
                    { icon: "linkedin", link: "https://www.linkedin.com/in/zhipeng-su-2282b3217/"},
                    { icon: "youtube", link: "https://space.bilibili.com/318184941?spm_id_from=333.788.0.0"}
                ],
                sidebar: {
                    '/zh/tidb/': tidbDocZhSideBar,
                    '/zh/oracle/': oracleZHDocSidebar,
                    '/zh/sqlserver/': sqlServerZHDocSideBar,
                    '/zh/english/': englishDocZhSideBar
                },
            }
        }
    }
}
  

