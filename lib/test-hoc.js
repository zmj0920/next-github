export default (Comp)=>{
    return function TestHocComp({Component,pageProps ,...rest}){
        if(pageProps){
            pageProps.test='123'
        }
       
          return <Comp Component={Component}  pageProps={pageProps} {...rest}/>
    }
    TestHocComp.getInitialProps=Comp.getInitialProps
    return TestHocComp 
}