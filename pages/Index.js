import Head from 'next/head'
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

export default Index
