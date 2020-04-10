import React from 'react'
import Head from 'next/head'
import { Box, BoxProps, Stack } from 'grommet'

import Header from 'components/Header'
import Footer from 'components/Footer'
import MenuScreen from 'screens/Menu'

import usePageTitle from 'hooks/usePageTitle'
import useTheme from 'hooks/useTheme'
import useConfiguration from 'hooks/useConfiguration'
import useMenuState from 'hooks/useMenuState'

type PageType = {
  title: string;
  description?: string;
  withScroll?: boolean;
  withFooter?: boolean;
}

const Page: React.FC<BoxProps & PageType> = ({
  children,
  title,
  description,
  withScroll = true,
  withFooter = true,
  ...props
}) => {
  const fullTitle = usePageTitle(title)
  const configuration = useConfiguration()
  const { theme: { header } } = useTheme()
  const { isMenuOpen } = useMenuState()

  return (
    <Box>
      <Head>
        <title>{fullTitle}</title>
        <meta name="description" content={description || configuration.getIn(['general', 'description'])} />
        {/* <meta property="og:description" content={description || contents.getIn(['general', 'description'])} /> */}
        {/* <meta property="twitter:description" content={description || contents.getIn(['general', 'description'])} /> */}
        {/* <meta property="og:title" content={getTitle(title)} /> */}
        {/* <meta property="og:image" content={socialBanner} /> */}
        {/* <meta property="twitter:title" content={getTitle(title)} /> */}
        {/* <meta property="twitter:image" content={socialBanner} /> */}
      </Head>

      <Box
        overflow={!withScroll || isMenuOpen ? 'hidden' : undefined}
        height={!withScroll ? '100vh' : undefined}
        width="100%"
        {...props}
      >
        <Header />

        <Box fill height={{ min: '80vh' }}>
          <Stack fill>
            <MenuScreen open={isMenuOpen} />
            <Box fill={!withScroll}>
              <Box pad={{ top: header.height }}>
                {children}
              </Box>
              {withFooter && (
                <Footer />
              )}
            </Box>
          </Stack>
        </Box>
      </Box>
    </Box>
  )
}

export default Page
