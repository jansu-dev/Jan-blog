const tidbDocSideBar = [{
    text: '原理总结',
    items: [
        { text: 'Item A', link: '/' },
        { text: 'Item B', link: '/' },
]
},
{
    text: '部署实践',
    items: [
      { text: 'Item C', link: '/item-c' },
      { text: 'Item D', link: '/item-d' },
    ]
  },
  {
    text: '版本特性',
    items: [
      { text: 'Item C', link: '/item-c' },
      { text: 'Item D', link: '/item-d' },
    ]
  },
  {
    text: '调优实践',
    items: [
      { text: 'Item C', link: '/item-c' },
      { text: 'Item D', link: '/item-d' },
    ]
  },
  {
    text: '生态工具',
    items: [
      { text: 'Item C', link: '/item-c' },
      { text: 'Item D', link: '/item-d' },
    ]
  },
  {
    text: '解决方案',
    items: [
      { text: 'Item C', link: '/item-c' },
      { text: 'Item D', link: '/item-d' },
    ]
  },
  {
    text: '源码阅读',
    items: [
      { text: 'Item C', link: '/item-c' },
      { text: 'Item D', link: '/item-d' },
    ]
  }
]


const oracleDocSideBar = [{
    text: '体系架构',
    items: [
        { text: 'Item A', link: '/' },
        { text: 'Item B', link: '/' },
]
},
{
    text: '部署实践',
    items: [
      { text: 'Item C', link: '/item-c' },
      { text: 'Item D', link: '/item-d' },
    ]
  },
  {
    text: '版本特性',
    items: [
      { text: 'Item C', link: '/item-c' },
      { text: 'Item D', link: '/item-d' },
    ]
  },
  {
    text: '调优实践',
    items: [
      { text: 'Item C', link: '/item-c' },
      { text: 'Item D', link: '/item-d' },
    ]
  },
  {
    text: '生态工具',
    items: [
      { text: 'Item C', link: '/item-c' },
      { text: 'Item D', link: '/item-d' },
    ]
  },
  {
    text: '解决方案',
    items: [
      { text: 'Item C', link: '/item-c' },
      { text: 'Item D', link: '/item-d' },
    ]
  },
  {
    text: '源码阅读',
    items: [
      { text: 'Item C', link: '/item-c' },
      { text: 'Item D', link: '/item-d' },
    ]
  }
]

const sqlServerDocSideBar = [{
    text: '原理总结',
    items: [
        { text: 'Item A', link: '/' },
        { text: 'Item B', link: '/' },
]
}
]

const languageDropDown = {
    text: "Languages",
    items: [
      { text: "简体中文", link: "/zh/" },
      { text: "English", link: "/en/" }
    ]
  }

export default {
    locales: {
        '/': {
            lang: 'en-US', // this will be set as the lang attribute on <html>
            title: 'Jan-Blog-US',
        },
        '/zh/': {
            lang: 'zh-CN',
            title: 'Jan-Blog-CN',
        }
    },
    themeConfig: {
        locales: {
            '/': {
                nav: [
                    { text: 'Home', link: '/en/'},
                    { text: 'Resume', link: '/en/about/contact'},
                    { text: 'TiDB Notes', link: '/en/tidb/index'},
                    { text: 'Oracle Notes', link: '/en/oracle/index'},
                    { text: 'SQL Server Notes', link: '/en/sqlserver/index'},
                    { text: 'Github', link: 'https://github.com/jansu-dev/Jan-Blog'},
                    languageDropDown
                    ],
                sidebar: {
                      '/en/tidb/': tidbDocSideBar,
                      '/en/oracle/': oracleDocSideBar,
                      '/en/sqlserver/': sqlServerDocSideBar
                  },
            },
            '/zh/': {
                nav: [
                    { text: '首页', link: '/'},
                    { text: '主人简介', link: '/zh/about/contact'},
                    { text: 'TiDB 笔记资料', link: '/zh/tidb/index'},
                    { text: 'Oracle 笔记资料', link: '/zh/oracle/index'},
                    { text: 'SQL Server 笔记资料', link: '/sqlserver/index'},
                    { text: 'Github', link: 'https://github.com/jansu-dev/Jan-Blog'},
                    languageDropDown
                ],
                sidebar: {
                    '/zh/tidb/': tidbDocSideBar,
                    '/zh/oracle/': oracleDocSideBar,
                    '/zh/sqlserver/': sqlServerDocSideBar
                },
            }
        }
    }
}
  