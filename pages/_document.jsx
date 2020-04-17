import React from 'react'
import Document, {
  Html,
  Head,
  Main,
  NextScript
} from 'next/document'

import initialStyles from 'styles/initial.module.css'

class MyDocument extends Document {
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  render() {
    return (
      <Html>
        <Head />
        <body className={initialStyles.body}>
          <div className={`${initialStyles.appContainer} app-wrapper`}>
            <Main />
            <NextScript />
          </div>
        </body>
      </Html>
    )
  }
}

export default MyDocument
