import React, { useMemo } from 'react'
import Head from 'next/head'
import { Grommet } from 'grommet'
import { useRouter } from 'next/router'

import LoadingScreen from 'screens/Loading'

import useAnalytics from 'hooks/useAnalytics'
import useLoading from 'hooks/useLoading'
import theme from 'themes/theme'

import { whoUpdated } from 'utils/dev/whoUpdated'

import { GlobalStyles } from './styled'
import { AnimatePresence } from 'framer-motion'

const Layout: React.FC = ({ children }) => {
  if (process.env.GOOGLE_ANALYTICS_TRACKING_ID) {
    useAnalytics(process.env.GOOGLE_ANALYTICS_TRACKING_ID)
  }

  const router = useRouter()
  const isLoading = useLoading()

  // Only rerender the pages when route changed
  const siteContent = useMemo(() => children, [router.pathname])

  whoUpdated('layout', { isLoading, children, pathname: router.pathname })

  return (
    <>
      <Head>
        {/* <meta property="og:url" content={currentUrl} /> */}
        <meta property="og:type" content="website" />
        {/* <meta property="twitter:url" content={currentUrl} /> */}
        <meta property="twitter:card" content="summary_large_image" />

        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />

        <meta name="robots" content="noindex" />

        {/* Fonts */}
        <link href="https://fonts.googleapis.com/css?family=Quicksand:400,700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css?family=Lato:400&display=swap" rel="stylesheet" />

        <script src="https://identity.netlify.com/v1/netlify-identity-widget.js" />
      </Head>

      <GlobalStyles />

      <Grommet theme={theme}>
        {isLoading && (
          <LoadingScreen />
        )}
        {siteContent}
      </Grommet>
    </>
  )
}

export default Layout
