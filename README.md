## Jan's Blog

<img src="images/blog_logo.png" alt="drawing" width="200"/>

[![LICENSE](https://img.shields.io/github/license/jansu-dev/mbr.svg)](https://github.com/jansu-dev/Jan-Blog/master/LICENSE)
[![Language](https://img.shields.io/badge/Language-nodejs-blue.svg)](https://golang.org/)
[![Language](https://img.shields.io/badge/Language-python-yellow.svg)](https://www.python.org/)
[![Build Status](https://travis-ci.org/pingcap/tidb.svg?branch=master)](https://travis-ci.org/pingcap/tidb)
[![vitepressDoc](https://img.shields.io/badge/vitepress-reference-blue.svg)](https://vitepress.vuejs.org/)


1. Previous time, the repo named `TiDB-Learning-Notes`, however, recently,I've merged some repo I created into the whole my own blog repo. So, please don't feel confused.
2. By this actions, now, you could view almost my sharing in below internet link. 
3. You can access my blog by clicking the logo above.

## How does it work
1. It uses vitepress,which is a vue frame work crated by typescript programming language, as a basic framework to create blog.
2. I coded some scripts using python3 to generated SideBar based on dictionary tree and filename of blog. 
## Look it on local
you can command them on terminal

```js
git clone https://github.com/jansu-dev/Jan-Blog && cd Jan-Blog
yarn add --dev vitepress vue
yarn docs:dev
```