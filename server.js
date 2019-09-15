const Koa = require("koa")
const Router = require("koa-router")
const next = require("next")
const session = require("koa-session")
const Redis = require("ioredis")
const koaBody = require('koa-body')
const RedisSessionStore = require('./server/session-store')
const dev = process.env.NODE_WNV != "production"
const app = next({ dev });
const handle = app.getRequestHandler()
// 实例化一个redisClient
const redis = new Redis(
    {
        port: 6379, // Redis port
        // host: "127.0.0.1", // Redis host
        // family: 4, // 4 (IPv4) or 6 (IPv6)
        password: "123456",
        // db: 0
    }
)

// 等到pages目录编译完成后启动服务响应请求
app.prepare().then(() => {
    const server = new Koa()
    const router = new Router()
    // 用于给session加密
    server.keys = ['ssh develop github app']
    // 解析post请求的内容
    server.use(koaBody())

    const SESSION_CONFIG = {
        // 设置到浏览器的cookie里的key
        key: 'sid',
        // 将自定义存储逻辑传给koa-session
        store: new RedisSessionStore(redis)
    }

    router.get('/api/user/info', async ctx => {
        ctx.session.user = {
            username: 'zmj',
            age: 18
        }
        ctx.body = 'set session'
    })


    router.get('/a/:name', async (ctx) => {
        const name = ctx.params.name;
        await handle(ctx.req, ctx.res, {
            pathname: '/a',
            query: {
                name
            }
        })
        ctx.respond = false;
    })
    server.use(session(SESSION_CONFIG, server))

    server.use(async (ctx, next) => {

        console.log(ctx.session)

        await next()
    })





    server.use(async (ctx, next) => {
        //cookies缓存id
        ctx.cookies.set('id', "userid:xxxxxxx", {
            httpOnly: false
        })
        await handle(ctx.req, ctx.res)
        ctx.respond = false;
    })



    server.use(async (ctx, next) => {
        ctx.res.statusCode = 200
        await next()
    })


    server.use(router.routes())

    server.listen(3000, () => {
        console.log("koa server 3000")
    })

})


// const router=new Router()
// router.get('/test/:id',(ctx)=>{
//     ctx.body = {success:true}
//     ctx.set('Content-Type','application/json')
// })
// server.use(router.routes())




