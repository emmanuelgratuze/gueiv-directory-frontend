import React from 'react'
import PropTypes, { InferProps } from 'prop-types'
import Head from 'next/head'

import usePageTitle from '~/hooks/usePageTitle'
import useAppContents from '~/hooks/useAppContents'
import Layout from '~/components/Layout'


const defaultProps = {
  children: null,
  description: null,
}

const propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
}

type PageType = InferProps<typeof propTypes>

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

Page.defaultProps = defaultProps
Page.propTypes = propTypes

export default Page
