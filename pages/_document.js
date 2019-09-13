// import Document, { Html, Head, Main, NextScript } from 'next/document'
// import { ServerStyleSheet } from 'styled-components'
// class MyDocument extends Document {
//   static async getInitialProps(ctx) {
//     const sheet = new ServerStyleSheet()
//     try {
//       const originalRenderPage = ctx.renderPage
//       ctx.renderPage = () => originalRenderPage({
//         enhanceApp: App => (props) => sheet.collectStyles(<App {...props} />)
//       })
//       const props = await Document.getInitialProps(ctx)
//       return {
//         ...props,
//         styles: <>{props.styles} {sheet.getStyleElement()}</>
//       }
//     } finally {
// sheet.seal()
//     }

//   }
//   render() {
//     return (
//       <Html>
//         <Head>

//         </Head>
//         <body>
//           <Main />
//           <NextScript />

//         </body>
//       </Html>
//     )
//   }
// }
// export default MyDocument

import Document, { Head, Main, NextScript } from 'next/document'
import { ServerStyleSheet } from 'styled-components'

export default class MyDocument extends Document {
  static getInitialProps({ renderPage }) {
    const sheet = new ServerStyleSheet()
    const page = renderPage(App => props => sheet.collectStyles(<App {...props} />))
    const styleTags = sheet.getStyleElement()
    return { ...page, styleTags }
  }

  render() {
    return (
      <html>
        <Head>
          {this.props.styleTags}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}