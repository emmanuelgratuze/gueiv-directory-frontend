import React from 'react'
import PropTypes, { InferProps } from 'prop-types';
import Head from 'next/head'
import { useRouter } from 'next/router'
import Header from '@components/Header'
import Page from '@components/Page'
import Footer from '@components/Footer'

import usePageTitle from '@hooks/usePageTitle'
import useAppConfig from '@hooks/useAppConfig'
import useAppContents from '@hooks/useAppContents'

import { GlobalStyles } from './styled';

const propTypes = {
  origin: PropTypes.string
}

type LayoutProps = InferProps<typeof propTypes>

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const contents = useAppContents()
  const router = useRouter()

  return (
    <>
      <Head>
        {/* <meta property="og:url" content={currentUrl} /> */}
        <meta property="og:type" content="website" />
        {/* <meta property="twitter:url" content={currentUrl} /> */}
        <meta property="twitter:card" content="summary_large_image" />

        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        
        {/* Fonts */}
        <link href="https://fonts.googleapis.com/css?family=Quicksand:400,500,700&display=swap" rel="stylesheet" />

        {/* <link rel="apple-touch-icon" sizes="180x180" href="/static/favicons/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/static/favicons/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/static/favicons/favicon-16x16.png" /> */}
        {/* <link rel="manifest" href="/static/favicons/site.webmanifest" />
        <link rel="mask-icon" href="/static/favicons/safari-pinned-tab.svg" color="#f4345e" />
        <link rel="shortcut icon" href="/static/favicons/favicon.ico" /> */}
        {/* <meta name="msapplication-TileColor" content="#ffffff" />
        <meta name="msapplication-config" content="/static/favicons/browserconfig.xml" />
        <meta name="theme-color" content="#ffffff" /> */}
      </Head>

      <GlobalStyles />

      <Header />

      {children}

      <Footer />
    </>
  );
}

Layout.propTypes = propTypes

export default Layout;
