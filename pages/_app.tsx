import React from 'react'
import { Provider } from 'react-redux'
import App from 'next/app'
import ErrorPage from 'next/error'

import store from '~/store/index'

/* eslint-disable */
if (process.env.NODE_ENV !== 'production') {
  const whyDidYouRender = require('@welldone-software/why-did-you-render')
  whyDidYouRender(React)
}
/* eslint-enable */

class GlobalApp extends App {
  // eslint-disable-next-line
  render() {
    const { Component, pageProps } = this.props

    return (
      <Provider store={store}>
        {pageProps.statusCode ? (
          <ErrorPage statusCode={pageProps.statusCode} />
        ) : (
          <Component {...pageProps} />
        )}
      </Provider>
    )
  }
}

export default GlobalApp
