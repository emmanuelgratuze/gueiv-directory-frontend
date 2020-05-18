import React, { useMemo } from 'react'
import Head from 'next/head'
import { Grommet } from 'grommet'
import { useRouter } from 'next/router'

import useAnalytics from 'hooks/generic/useAnalytics'
import theme from 'themes/theme'

import { GlobalStyles } from './styled'

const Layout: React.FC = ({
  children
}) => {
  if (process.env.GOOGLE_ANALYTICS_TRACKING_ID) {
    useAnalytics(process.env.GOOGLE_ANALYTICS_TRACKING_ID)
  }

  const router = useRouter()

  // Only rerender the pages when route changed (or if the content changes)
  const siteContent = useMemo(
    () => children,
    [router.pathname, children]
  )

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
        <link href="https://fonts.googleapis.com/css?family=Quicksand:500,700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css?family=Lato:400&display=swap" rel="stylesheet" />

        <link rel="apple-touch-icon" sizes="144x144" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#0B89CB" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <meta name="msapplication-TileColor" content="#f1f1f1" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        <meta name="theme-color" content="#f1f1f1" />

        <script src="https://identity.netlify.com/v1/netlify-identity-widget.js" />
      </Head>

      <GlobalStyles />

      <Grommet theme={theme}>
        {siteContent}
      </Grommet>
    </>
  )
}

export default Layout
