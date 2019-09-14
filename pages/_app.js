import App, { Container } from 'next/app'
import { Provider } from 'react-redux'
// import store from '../store/store'
import 'antd/dist/antd.css'
import Layout from '../components/Layout'
import withRedux from '../lib/with-redux'

class Myapp extends App {
    static async getInitialProps(ctx) {
        const {Component} = ctx
        let pageProps = {}
        if (Component.getInitialProps) {
            pageProps = await Component.getInitialProps(ctx)
        }
        return { pageProps }
    }
    render() {
        const { Component, pageProps, reduxStore} = this.props
        return (
            <Container>
                <Provider store={reduxStore}>
                    <Layout>
                        <Component {...pageProps} />
                    </Layout>
                </Provider>
            </Container>
        )
    }
}

export default withRedux(Myapp) 