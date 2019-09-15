import { Button } from 'antd';
import Link from 'next/link'
import Router from 'next/router'
const Index = () => {
    function gotoA() {
        // Router.push('/jspangA?name=渣渣新A')
        Router.push({
            pathname: '/a',
            query: {
                name: '渣渣新'
            }
        },'/a/渣渣新')
    }
    const events = [
        'routeChangeStart',
        'routeChangeComplete',
        'beforeHistoryChange',
        'routeChangeError',
        'hashChangeStart',
        'hashChangeComplete'
    ]
    
    function makeEvent(type){
        return(...args)=>{
            console.log(type, ...args)
        }
    }

    events.forEach(event=>{
        Router.events.on(event,makeEvent(event))
    })

    return (
        <div>
            <Link href="/a?name=渣渣新" as="/a/渣渣新" >
                <Button>index</Button>
            </Link>
            <Button onClick={gotoA}>index</Button>
            <div><Link href={{pathname:'/a',query:{name:'(小)渣渣新'}}}><a>小渣渣新页面</a></Link></div>
        </div>
    )
}

export default Index


import Head from 'next/head'
import {connect} from 'react-redux'



const Index = () => {
  return (
    <>
      <Head>
        <title>首页</title>
      </Head>
      <div>
        <span>index</span>
      </div>
      <style jsx>{`
     a {
        color:red
       }
   `}</style>

      <style jsx global>{`
   body {
     background: red
   }
 `}</style>
    </>
  )
}

export default connect()(Index)
