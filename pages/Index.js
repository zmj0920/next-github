import Head from 'next/head'
import axios from 'axios'
import {request} from '../lib/api'
const Index = () => {
    return (
        <>
            <Head>
                <title>首页</title>
            </Head>
            <div>

            </div>
        </>
    )
}

Index.getInitialProps = async ({ ctx }) => {
    const result = await request({
        url: `/search/repositories?q=react`,
    }, ctx.req, ctx.res)

    return {
        repos: result.data,
    }
}
export default Index

