import React from 'react'
import Head from 'next/head'
import { Grommet } from 'grommet'

import Header from '~/components/Header'
import Footer from '~/components/Footer'
import theme from '~/themes/theme'

import { GlobalStyles } from './styled'

const Layout: React.FC = ({ children }) => (
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
      <link href="https://fonts.googleapis.com/css?family=Lato&display=swap" rel="stylesheet" />
    </Head>

    <GlobalStyles />

    <Grommet theme={theme}>
      <Header />
      {children}
      <Footer />
    </Grommet>
  </>
)

export default Layout
