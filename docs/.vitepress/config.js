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

export default {
    title: 'Jan-Blog',
    description: 'Just playing around.',
    themeConfig: {
        nav: [
            { text: '首页', link: '/'},
            { text: '主人简介', link: '/about/contact'},
            { text: 'TiDB 笔记资料', link: '/tidb/index'},
            { text: 'Oracle 笔记资料', link: '/oracle/index'},
            { text: 'SQL Server 笔记资料', link: '/sqlserver/index'},
            { text: 'Github', link: 'https://github.com/jansu-dev/Jan-Blog'}
        ],
        sidebar: {
            '/tidb/': tidbDocSideBar,
            '/oracle/': oracleDocSideBar,
            '/sqlserver/': sqlServerDocSideBar
        }
    }
}
  