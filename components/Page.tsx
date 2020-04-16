import React, { useEffect } from 'react'
import Head from 'next/head'
import { Box, BoxProps, Stack } from 'grommet'

import Header from 'components/Header'
import Footer from 'components/Footer'

import MenuScreen from 'screens/Menu'

import usePageTitle from 'hooks/usePageTitle'
import useTheme from 'hooks/useTheme'
import useFilterMenu from 'hooks/useFilterMenu'
import useConfiguration from 'hooks/useConfiguration'
import useMenuState from 'hooks/useMenuState'

import FiltersMenu from './FiltersMenu'

type PageType = {
  title: string;
  description?: string;
  withScroll?: boolean;
  withFooter?: boolean;
  withFilters?: boolean;
}

const Page: React.FC<BoxProps & PageType> = ({
  children,
  title,
  description,
  withScroll = true,
  withFooter = true,
  withFilters,
  ...props
}) => {
  const fullTitle = usePageTitle(title)
  const configuration = useConfiguration()
  const { theme: { header } } = useTheme()
  const { isMenuOpen, closeMenu } = useMenuState()
  const { isOpen: areFiltersOpen, close: closeFilters } = useFilterMenu()

  useEffect(() => {
    if (areFiltersOpen) {
      closeMenu()
    }
  }, [areFiltersOpen])

  useEffect(() => {
    if (isMenuOpen) {
      closeFilters()
    }
  }, [isMenuOpen])

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
        height={!withScroll ? '100vh' : { min: '100vh' }}
        {...props}
      >
        <Header withFilters={withFilters} />
        <Stack>
          <MenuScreen open={isMenuOpen} />
          <FiltersMenu />
        </Stack>
        <Box fill={!withScroll}>
          <Box fill={!withScroll} pad={{ top: header.height }}>
            {children}
          </Box>
          {withFooter && (
            <Footer />
          )}
        </Box>
      </Box>
    </Box>
  )
}

export default Page
