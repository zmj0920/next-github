import {withRouter} from 'next/router'
import axios from 'axios'
const A=({router,name})=>{
    return (<button>{router.query.name},来为我们服务了<img src={name}/> </button>)
   }
A.getInitialProps= async ()=>{
    const promise =new Promise((resolve)=>{
            axios('http://47.95.225.57:3000/banner').then(
                (res)=>{
                    console.log('远程数据结果：',res.data.banners)
                    resolve({
                       name: res.data.banners[1].imageUrl
                    })
                }
            )
    })
    return await promise
}
 export default withRouter(A)