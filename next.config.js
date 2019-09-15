const withCss = require('@zeit/next-css')
const config = require('./config')
const { GITHUB_OAUTH_URL } = config
// 配置说明
const configs = {
    // 编译文件的输出目录
    distDir: 'dest',
    // 是否给每个路由生成Etag
    // Etag是用来做缓存验证的，如果路由执行的时候，新的Etag是相同的，那么就会复用当前内容，而无需重新渲染
    // 默认情况下，nextJS是会对每个路由生成Etag的。但是如果我们部署的时候，ngx已经做了Etag的配置，
    //那么就可以关闭nextJS的Etag，节省性能
    generateEtags: true,
    // （不常用）页面内容缓存配置，只针对开发环境
    onDemandEntries: {
        // 内容在内存中缓存的时长（ms）
        maxInactiveAge: 25 * 1000,
        // 最多同时缓存多少个页面
        pagesBufferLength: 2,
    },
    // 在pages目录下那种后缀的文件会被认为是页面
    pageExtensions: ['jsx', 'js'],
    // （不常用）配置buildId，一般用于同一个项目部署多个节点的时候用到
    generateBuildId: async () => {
        if (process.env.YOUR_BUILD_ID) {
            return process.env.YOUR_BUILD_ID
        }

        // 返回null，使用nextJS默认的unique id
        return null
    },
    // （重要配置）手动修改webpack config
    webpack(config, options) {
        return config
    },
    // （重要配置）修改webpackDevMiddleware配置
    webpackDevMiddleware: config => {
        return config
    },
    // （重要配置）可以在页面上通过 procsess.env.customKey 获取 value。跟webpack.DefinePlugin实现的一致
    env: {
        customKey: 'value',
    },
    // 下面两个要通过 'next/config' 来读取
    // 只有在服务端渲染时才会获取的配置
    serverRuntimeConfig: {
        mySecret: 'secret',
        secondSecret: process.env.SECOND_SECRET,
    },
    // 在服务端渲染和客户端渲染都可获取的配置
    publicRuntimeConfig: {
        GITHUB_OAUTH_URL,
        OAUTH_URL: config.OAUTH_URL,
        staticFolder: '/static',
    },
    // 上面这两个配置在组件里使用方式如下：
    // import getCofnig from 'next/config'
    // const { serverRuntimeConfig,publicRuntimeConfig } = getCofnig()
    // console.log( serverRuntimeConfig,publicRuntimeConfig )
}

if (typeof require !== 'undefined') {
    require.extensions['.css'] = file => { }
}

// 虽然next-css看起来是一个处理样式的插件，实则它是接收的一个对象，可以把传入的其他非css相关的webpack配置一并处理。
// 建议不要直接写一个新的webpack配置，因为next-css里面的webpack的配置是非常全面的，如果被覆盖了，可能会导致报错。
module.exports = withCss(configs)

