import React from 'react'
import { Provider } from 'react-redux'
import App from 'next/app'
import withRedux from 'next-redux-wrapper'
import withReduxSaga from 'next-redux-saga'
import ErrorPage from 'next/error'
import absoluteUrl from 'next-absolute-url'

import Layout from '@components/Layout'
import compose from '@utils/compose'
import configureStore from '@store'

/* eslint-disable */
if (process.env.NODE_ENV !== 'production') {
  const whyDidYouRender = require('@welldone-software/why-did-you-render')
  whyDidYouRender(React)
}
/* eslint-enable */

class GlobalApp extends App {
  static async getInitialProps(context) {
    let pageProps = {}

    // Fetch user if logged and not already fetched
    const { ctx } = context

    try {
      const componentPromise = App.getInitialProps({ ...context, ctx: { ...ctx } })
      const [props] = await Promise.all([
        componentPromise
      ])
      pageProps = { ...props.pageProps }
    } catch (err) {
      if (
        (err.statusCode && context.res) // Server returns error
        || err.message === '404' // initial props returns 404
      ) {
        pageProps.statusCode = err.statusCode || err.message
      } else {
        throw Error(err)
      }
    }

    const { origin } = absoluteUrl(ctx.req)

    return {
      origin,
      pageProps,
      ua: context.req ? context.req.get('User-Agent') : undefined
    }
  }

  render() {
    const {
      Component,
      pageProps,
      store,
      origin,
      ua
    } = this.props

    return (
      <Provider store={store}>
        <Layout
          ua={ua}
          origin={origin}
        >
          {pageProps.statusCode ? (
            <ErrorPage statusCode={pageProps.statusCode} />
          ) : (
            <Component {...pageProps} />
          )}
        </Layout>
      </Provider>
    )
  }
}

export default compose(withReduxSaga, withRedux(configureStore))(GlobalApp)
