// const Koa = require("koa")
// const Router = require("koa-router")
// const next = require("next")
// const session = require("koa-session")
// const Redis = require("ioredis")
// const koaBody = require('koa-body')
// const RedisSessionStore = require('./server/session-store')
// const auth = require('./server/auth')
// const dev = process.env.NODE_WNV != "production"
// const app = next({ dev });
// const handle = app.getRequestHandler()
// const PORT = 3000
// // 实例化一个redisClient
// const redis = new Redis(
//     {
//         port: 6379, // Redis port
//         // host: "127.0.0.1", // Redis host
//         // family: 4, // 4 (IPv4) or 6 (IPv6)
//         password: "123456",
//         // db: 0
//     }
// )

// // 等到pages目录编译完成后启动服务响应请求
// app.prepare().then(() => {
//     const server = new Koa()
//     const router = new Router()
//     // 用于给session加密
//     server.keys = ['ssh develop github app']
//     // 解析post请求的内容
//     server.use(koaBody())

//     const SESSION_CONFIG = {
//         // 设置到浏览器的cookie里的key
//         key: 'sid',
//         // 将自定义存储逻辑传给koa-session
//         store: new RedisSessionStore(redis)
//     }

//     server.use(session(SESSION_CONFIG, server))
//     // 处理github Oauth登录
//     auth(server)

//     router.get('/api/user/info', async (ctx) => {
//         const { userInfo } = ctx.session
//         if (userInfo) {
//             ctx.body = userInfo
//             // 设置头部 返回json
//             ctx.set('Content-Type', 'application/json')
//         } else {
//             ctx.status = 401
//             ctx.body = 'Need Login'
//         }
//     })


//     server.use(async (ctx, next) => {
//         //cookies缓存id
//         // ctx.cookies.set('id', "userid:xxxxxxx", {
//         //     httpOnly: false
//         // })
//         ctx.req.session = ctx.session
//         await handle(ctx.req, ctx.res)
//         ctx.respond = false;
//     })

//     server.use(router.routes())

//     server.listen(PORT, () => {
//         console.log(`koa server listening on ${PORT}`)
//     })
// })


// // const router=new Router()
// // router.get('/test/:id',(ctx)=>{
// //     ctx.body = {success:true}
// //     ctx.set('Content-Type','application/json')
// // })
// // server.use(router.routes())

// // router.get('/a/:name', async (ctx) => {
// //     const name = ctx.params.name;
// //     await handle(ctx.req, ctx.res, {
// //         pathname: '/a',
// //         query: {
// //             name
// //         }
// //     })
// //     ctx.respond = false;
// // })

const Koa = require('koa')
const Router = require('koa-router')
const next = require('next')
const session = require('koa-session')
const Redis = require('ioredis')
const koaBody = require('koa-body')
const atob = require('atob')
const auth = require('./server/auth')
// const api = require('./server/api')
const RedisSessionStore = require('./server/session-store')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()
// 实例化一个redisClient
const redisClient = new Redis(
    {
        port: 6379, // Redis port
        // host: "127.0.0.1", // Redis host
        // family: 4, // 4 (IPv4) or 6 (IPv6)
        password: "123456",
        // db: 0
    }
)
const PORT = 3000
// 给node全局增加atob方法
global.atob = atob
// 等到pages目录编译完成后启动服务响应请求
app.prepare().then(() => {
    const server = new Koa()
    const router = new Router()

    // 用于给session加密
    server.keys = ['ssh develop github app']
    // 解析post请求的内容
    server.use(koaBody())

    const sessionConfig = {
        // 设置到浏览器的cookie里的key
        key: 'sid',
        // 将自定义存储逻辑传给koa-session
        store: new RedisSessionStore(redisClient),
    }
    server.use(session(sessionConfig, server))

    // 处理github Oauth登录
    auth(server)
    // 处理github请求代理
    //   api(server)

    router.get('/a/:id', async (ctx) => {
        const { id } = ctx.params
        await handle(ctx.req, ctx.res, {
            pathname: '/a',
            query: {
                id,
            },
        })
        ctx.respond = false
    })

    router.get('/api/user/info', async (ctx) => {
        const { userInfo } = ctx.session
        if (userInfo) {
            ctx.body = userInfo
            // 设置头部 返回json
            ctx.set('Content-Type', 'application/json')
        } else {
            ctx.status = 401
            ctx.body = 'Need Login'
        }
    })

    server.use(router.routes())

    server.use(async (ctx) => {
        // req里获取session
        ctx.req.session = ctx.session
        await handle(ctx.req, ctx.res)
        ctx.respond = false
    })

    server.listen(PORT, () => {
        console.log(`koa server listening on ${PORT}`)
    })
})





