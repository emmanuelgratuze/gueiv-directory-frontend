import React from 'react'
import { Provider as ReduxProvider } from 'react-redux'
import App, { AppProps } from 'next/app'
import ErrorPage from 'next/error'
import configureStore from 'store/index'
import { CloudinaryProvider } from 'components/cloudinary/CloudinaryContext'
import Layout from 'components/Layout'

import useAnalytics from 'hooks/generic/useAnalytics'
import useStaticDataInStore from 'hooks/generic/useStaticDataInStore'

const store = configureStore()

const ProjectApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  // Get static data
  useStaticDataInStore(store, pageProps)

  if (process.env.GOOGLE_ANALYTICS_TRACKING_ID) {
    useAnalytics(process.env.GOOGLE_ANALYTICS_TRACKING_ID)
  }

  return (
    <Layout>
      <CloudinaryProvider cloudName={process.env.CLOUDINARY_CLOUD_NAME || ''}>
        <ReduxProvider store={store}>
          {pageProps.statusCode ? (
            <ErrorPage statusCode={pageProps.statusCode} />
          ) : (
            <Component {...pageProps} />
          )}
        </ReduxProvider>
      </CloudinaryProvider>
    </Layout>
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
