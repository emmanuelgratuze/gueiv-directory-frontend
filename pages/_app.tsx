import React from 'react'
import { Provider } from 'react-redux'
import App, { AppProps } from 'next/app'
import ErrorPage from 'next/error'

import useStorePreloadedWithStaticProps from '~/hooks/useStorePreloadedWithStaticProps'
import Layout from '~/components/Layout'

/* eslint-disable */
if (process.env.NODE_ENV !== 'production') {
  const whyDidYouRender = require('@welldone-software/why-did-you-render')
  whyDidYouRender(React)
}
/* eslint-enable */

const ProjectApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  const store = useStorePreloadedWithStaticProps(pageProps)
  return (
    <Provider store={store}>
      <Layout>
        {pageProps.statusCode ? (
          <ErrorPage statusCode={pageProps.statusCode} />
        ) : (
          <Component {...pageProps} />
        )}
      </Layout>
    </Provider>
  )
}

class NextApp extends App {
  render(): JSX.Element {
    return (
      <ProjectApp {...this.props} />
    )
  }
}

export default NextApp
