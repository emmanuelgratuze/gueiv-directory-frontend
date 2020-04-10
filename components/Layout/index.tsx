import React from 'react'
import Head from 'next/head'
import { Grommet } from 'grommet'
import { useRouter } from 'next/router'
import { AnimatePresence, motion } from 'framer-motion'

import LoadingScreen from 'screens/Loading'

import useAnalytics from 'hooks/useAnalytics'
import useLoading from 'hooks/useLoading'
import theme from 'themes/theme'

import { GlobalStyles } from './styled'

const Layout: React.FC = ({ children }) => {
  if (process.env.GOOGLE_ANALYTICS_TRACKING_ID) {
    useAnalytics(process.env.GOOGLE_ANALYTICS_TRACKING_ID)
  }

  const router = useRouter()
  const isLoading = useLoading()

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
        <AnimatePresence exitBeforeEnter>
          {!isLoading && (
            <motion.div
              key={router.route}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {children}
            </motion.div>
          )}
          {isLoading && (
            <motion.div
              key={router.route}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <LoadingScreen />
            </motion.div>
          )}
        </AnimatePresence>
      </Grommet>
    </>
  )
}

export default Layout
