import React, { useEffect } from 'react'
import Head from 'next/head'
import { Box, BoxProps, Stack } from 'grommet'

import Header from 'components/Header'
import Footer from 'components/Footer'

import MenuWrapper from 'components/Menu/Wrapper'

import usePageTitle from 'hooks/generic/usePageTitle'
import useTheme from 'hooks/generic/useTheme'
import useFilterMenu from 'hooks/app/brands/useFilterMenu'
import useConfiguration from 'hooks/app/useConfiguration'
import useMenuState from 'hooks/app/useMenuState'

import FiltersMenu from './FiltersMenu'

type PageType = {
  title: string;
  description?: string;
  withScroll?: boolean;
  withFooter?: boolean;
  withFilters?: boolean;
  headerChildren?: React.ReactNode;
}

const Page: React.FC<BoxProps & PageType> = ({
  children,
  title,
  description,
  withScroll = true,
  withFooter = true,
  headerChildren,
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
        <Header>
          {headerChildren}
        </Header>
        <MenuWrapper>
          <Stack>
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
        </MenuWrapper>
      </Box>
    </Box>
  )
}

export default Page
