# 教你玩转react、next、hooks 、koa、antd

#### 前言
以下文章纯属个人理解，便于记录学习，肯定有理解错误或理解不到位的地方，
意在站在前辈的肩膀，分享个人对技术的通俗理解，共同成长！


> 官方网站：https://nextjs.org  

> 中文官网：https://nextjs.frontendx.cn

> API: https://developer.github.com/apps/building-oauth-apps/authorizing-oauth-apps/

> 项目体验地址 ：http://www.taobaods.xin:5000


本项目使用Next.js开发 React 服务端渲染，因为当我们要做SEO优化时是一件很麻烦的事情，
常常需要配置很多繁琐的参数使我们开发增加难度，然而Next.js框架帮助我们解决了很多的配置问题，
使我们开发的时候变得简单本项目使用技术有 next  react-hooks  redux react-redux  redux-thunk 
服务端使用 koa redis 

> Author:君吟

> Email: 506499594@qq.com  

> github: https://github.com/zmj0920/


#### 运行
```
npm run dev

```

#### 目录结构
```
├── components           非页面级共用组件
│   └── Layout.jsx       路由配置文件
├── lib                  一些通用的js
│   └── with-redux.js    继承redux
├── pages                页面级组件 会被解析成路由
│   └── _app.js          自定义 app配置
│   └── _document.js     自定义 document 配置
│   └── index.js         首页
├── server               服务端文件
│   └── auth.js          github auth 授权
│   └── session-store.js 使用redis缓存store 
├── static               静态资源
├── store                redux使用相关文件
├── test                 测试文件 
├── babelrc              babel 编译配置
├── gitignore            git不需要上传文件配置
├── next.config.js       next 相关配置
├── package.json         项目依赖配置文件
├── README.md            项目说明文件
├── server.js            服务端文件
```

安装依赖

```
    "@zeit/next-bundle-analyzer": "^0.1.2", //观察打包代码
    "@zeit/next-css": "^1.0.1", //支持css文件引入配置
    "antd": "^3.23.1",          // ui库使用
    "atob": "^2.1.2",           //对base64编码过的字符串进行解码
    "axios": "^0.19.0",         // 数据请求
    "babel-plugin-import": "^1.12.1",     //在编译过程中将 import 的写法自动转换为按需引入ui组件
    "github-markdown-css": "^3.0.1",      //  github-markdown 的样式美化
    "ioredis": "^4.14.0",                 //链接redis使用
    "koa": "^2.8.1",                      //koa框架
    "koa-body": "^4.1.1",                 
    "koa-router": "^7.4.0",
    "koa-session": "^5.12.3",
    "lru-cache": "^5.1.1",              //数据缓存
    "moment": "^2.24.0",                //日期格式化
    "next": "^9.0.5",
    "react": "^16.9.0",
    "react-dom": "^16.9.0",
    "react-redux": "^7.1.1",                //状态管理
    "redux": "^4.0.4",
    "redux-devtools-extension": "^2.13.8",   //监听redux状态调试工具 
    "redux-thunk": "^2.3.0",
    "styled-components": "^2.1.0"             //css 组件
```


## ssr 流程
![ssr渲染流程](./static/img/16ca8dc70d421934.png)
