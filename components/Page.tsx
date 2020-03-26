import React from 'react'
import Head from 'next/head'

import usePageTitle from '~/hooks/usePageTitle'
import useAppContents from '~/hooks/useAppContents'
import Layout from '~/components/Layout'

type PageType = {
  title: string;
  description?: string;
}

const Page: React.FC<PageType> = ({
  children,
  title,
  description
}) => {
  const fullTitle = usePageTitle(title)
  const contents = useAppContents()

  return (
    <>
      <Head>
        <title>{fullTitle}</title>
        <meta name="description" content={description || contents.getIn(['general', 'description'])} />

        {/* <meta property="og:description" content={description || contents.getIn(['general', 'description'])} /> */}
        {/* <meta property="twitter:description" content={description || contents.getIn(['general', 'description'])} /> */}
        {/* <meta property="og:title" content={getTitle(title)} /> */}
        {/* <meta property="og:image" content={socialBanner} /> */}
        {/* <meta property="twitter:title" content={getTitle(title)} /> */}
        {/* <meta property="twitter:image" content={socialBanner} /> */}
      </Head>
      <Layout>
        {children}
      </Layout>
    </>
  )
}

export default Page
