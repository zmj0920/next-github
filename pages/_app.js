import App, { Container } from 'next/app'
import { Provider } from 'react-redux'
import 'antd/dist/antd.css'
import Layout from '../components/Layout'
import withRedux from '../lib/with-redux'
import PageLoading from '../components/PageLoading'
import Router from 'next/router'
class Myapp extends App {

    // App组件的getInitialProps比较特殊
    // 能拿到一些额外的参数
    // Component: 被包裹的组件

    static async getInitialProps(ctx) {
        const { Component } = ctx
        let pageProps = {}

        // 拿到Component上定义的getInitialProps
        if (Component.getInitialProps) {

            // 执行拿到返回结果
            pageProps = await Component.getInitialProps(ctx)
        }
        // 返回给组件
        return { pageProps }
    }

    state = {
        context: 'value',
        loading: false,
    }
    //开始loading
    startLoading = () => {
        this.setState({
            loading: true,
        })
    }
    //关闭 loading
    stopLoading = () => {
        this.setState({
            loading: false,
        })
    }

    componentDidMount() {
        Router.events.on('routeChangeStart', this.startLoading)
        Router.events.on('routeChangeComplete', this.stopLoading)
        Router.events.on('routeChangeError', this.stopLoading)
    }

    componentWillUnmount() {
        Router.events.off('routeChangeStart', this.startLoading)
        Router.events.off('routeChangeComplete', this.stopLoading)
        Router.events.off('routeChangeError', this.stopLoading)
    }


    render() {
        const { Component, pageProps, reduxStore } = this.props
        return (
            <Container>
                <Provider store={reduxStore}>
                    <Layout>
                        {this.state.loading ? <PageLoading /> : null}
                        {/* 把pageProps解构后传递给组件 */}
                        <Component {...pageProps} />
                    </Layout>
                </Provider>
            </Container>
        )
    }
}

export default withRedux(Myapp) 