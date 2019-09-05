const Redis=require("ioredis")
 async function  test(){
    const redis=new Redis(
        {
            port: 6379, // Redis port
            // host: "127.0.0.1", // Redis host
            // family: 4, // 4 (IPv4) or 6 (IPv6)
            password: "123456",
           // db: 0
        }
    )
    
   
    await redis.set('c',123)
    //await redis.setex('a', 10,123)  //时间存储
    const key = await redis.keys('*')
    console.log(key)
    console.log(await redis.get('c'))
}

test();