import React from 'react'
import { Provider as ReduxProvider } from 'react-redux'
import App, { AppProps } from 'next/app'
import ErrorPage from 'next/error'
import { CloudinaryProvider } from 'components/cloudinary/CloudinaryContext'

import useStoreWithPageData from 'hooks/useStoreWithPageData'
import Layout from 'components/Layout'

const ProjectApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  const store = useStoreWithPageData(pageProps)
  return (
    <CloudinaryProvider cloudName={process.env.CLOUDINARY_CLOUD_NAME || ''}>
      <ReduxProvider store={store}>
        <Layout>
          {pageProps.statusCode ? (
            <ErrorPage statusCode={pageProps.statusCode} />
          ) : (
            <Component {...pageProps} />
          )}
        </Layout>
      </ReduxProvider>
    </CloudinaryProvider>
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
