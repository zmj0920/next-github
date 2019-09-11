import App, { Container } from 'next/app'

import 'antd/dist/antd.css'

class Myapp extends App {
    render() {
        const { Component } = this.props
        console.log(Component)
        return (
            < Container >
                <Component />
            </Container >
        )
    }
}

export default Myapp