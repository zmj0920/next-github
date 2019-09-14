import App, { Container } from 'next/app'
import { Provider } from 'react-redux'
import store from '../store/store'
import 'antd/dist/antd.css'
import Layout from '../components/Layout'
class Myapp extends App {
    static async getInitialProps({ Component, ctx }) {
        let pageProps = {}
        if (Component.getInitialProps) {
            pageProps = await Component.getInitialProps(ctx)
        }
        return { pageProps }
    }
    render() {
        const { Component, pageProps} = this.props
        return (
            <Container>
                <Provider store={store}>
                    <Layout>
                        <Component {...pageProps} />
                    </Layout>
                </Provider>
            </Container>
        )
    }
}

export default Myapp