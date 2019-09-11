import App, { Container } from 'next/app'
import 'antd/dist/antd.css'
import Layout from '../components/Layout'
class Myapp extends App {
    static async getInitialProps({ Component }) {
        console.log('app init')
        let pageProps
        if (Component.getInitialProps) {
            pageProps = await Component.getInitialProps()
        }
        return {
            pageProps
        }
    }

    render() {
        const { Component, pageProps } = this.props
        console.log(Component)
        return (
            < Container >
                <Layout>
                    <Component {...pageProps} />
                </Layout>
            </Container >
        )
    }
}

export default Myapp