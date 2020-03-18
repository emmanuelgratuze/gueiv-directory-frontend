import React, { useEffect, useState } from 'react'
import { Provider } from 'react-redux'
import App, { AppProps } from 'next/app'
import ErrorPage from 'next/error'

import Layout from '@components/Layout'
import store from '@store/index'

/* eslint-disable */
if (process.env.NODE_ENV !== 'production') {
  const whyDidYouRender = require('@welldone-software/why-did-you-render')
  whyDidYouRender(React)
}

/* eslint-enable */
class GlobalApp extends App {
  render() {
    const { Component, pageProps, ...values } = this.props

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
