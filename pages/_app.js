import App, { Container } from 'next/app'
import 'antd/dist/antd.css'
import Layout from '../components/Layout'
class Myapp extends App {
    static async getInitialProps({ Component, router, ctx }) {
        let pageProps = {}
        if (Component.getInitialProps) {
            pageProps = await Component.getInitialProps(ctx)
        }
        return { pageProps }
    }
    render() {
        const { Component, pageProps } = this.props
        return (
            <Container>
                <Layout>
                    <Component {...pageProps} />
                </Layout>
            </Container>
        )
    }
}

export default Myapp