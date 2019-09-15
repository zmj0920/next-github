import { withRouter } from 'next/router'
import axios from 'axios'
import styled from 'styled-components'

const Title = styled.h1`
            color:yellow;
            font-size:40px;
            `

const A = ({ router, name }) => {
    return (<><Title>title</Title><button>{router.query.name},来为我们服务了<img src={name} /> </button></>)
}
A.getInitialProps = async (ctx) => {
    const promise = new Promise((resolve) => {
        axios('http://47.95.225.57:3000/banner').then(
            (res) => {
                console.log('远程数据结果：', res.data.banners)
                resolve({
                    name: res.data.banners[1].imageUrl
                })
            }
        )
    })
    return await promise
}
export default withRouter(A)