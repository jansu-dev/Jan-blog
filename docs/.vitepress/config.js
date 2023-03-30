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

const languageEnDropDown = {
    text: "Languages",
    items: [
      { text: "English", link: "/en/index" },
      { text: "简体中文", link: "/zh/index" }
    ]
  }

  const languageZhDropDown = {
    text: "简体中文",
    items: [
      { text: "English", link: "/en/index" },
      { text: "简体中文", link: "/zh/index" }
    ]
  }

const DocEnDropDown = {
    text: "Docs",
    items: [
      { text: "TiDB Series", link: "/en/tidb/index" },
      { text: "Oracle Series", link: "/en/oracle/index" },
      { text: "SQL Server Series", link: "/en/sqlserver/index" },
      { text: "English Learning Series", link: "/en/english/index" },
    ]
  }

const DocZhDropDown = {
    text: "文档笔记",
    items: [
      { text: "TiDB 系列", link: "/zh/tidb/index" },
      { text: "Oracle 系列", link: "/zh/oracle/index" },
      { text: "SQL Server 系列", link: "/zh/sqlserver/index" },
      { text: "英语学习系列", link: "/zh/english/index" },
    ]
  }

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
        root: {
            lang: 'en',
            title: 'Jan-Blog-EN',
            themeConfig: { 
                nav: [
                    { text: 'Home', link: '/en/index'},
                    DocEnDropDown,
                    { text: 'Community', link: 'http://forum.dbnest.net'},
                    languageEnDropDown
                    ],
                sidebar: {
                      '/en/tidb/': tidbDocEnSideBar,
                      '/en/english/': englishDocEnSideBar
                  },
            }
        },
        zh: {
            lang: 'zh',
            title: 'Jan-Blog-CN',
            link: '/zh/index',
            themeConfig: {
                nav: [
                    { text: '首页', link: '/zh/index'},
                    DocZhDropDown,
                    { text: '社区', link: 'http://forum.dbnest.net/categories'},
                    languageZhDropDown
                ],
                sidebar: {
                    '/zh/tidb/': tidbDocZhSideBar,
                    '/zh/oracle/': oracleZHDocSidebar,
                    '/zh/sqlserver/': sqlServerZHDocSideBar,
                    '/zh/english/': englishDocZhSideBar
                },
            }
        }
    },
    themeConfig: {
        logo: '/logo.png',
        socialLinks: [
            { icon: "github", link: "https://github.com/jansu-dev/Jan-Blog" },
            { icon: "linkedin", link: "https://www.linkedin.com/in/zhipeng-su-2282b3217/"},
            { icon: "youtube", link: "https://space.bilibili.com/318184941?spm_id_from=333.788.0.0"}
        ],
    }
}
  

