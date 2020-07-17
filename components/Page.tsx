import React, { useEffect } from 'react'
import Head from 'next/head'
import { Box, BoxProps, Stack } from 'grommet'
import { AnimatePresence, motion } from 'framer-motion'
import { useRouter } from 'next/router'

import Header, { HeaderProps } from 'components/Header'
import Footer from 'components/Footer'
import MenuWrapper from 'components/Menu/Wrapper'
import LoadingWrapper from 'components/PageLoading/Wrapper'

import usePageTitle from 'hooks/generic/usePageTitle'
import useTheme from 'hooks/generic/useTheme'
import useFilterMenu from 'hooks/app/brands/useFilterMenu'
import useConfiguration from 'hooks/app/useConfiguration'
import useMenuState from 'hooks/app/useMenuState'
import useLoading from 'hooks/generic/useRouteLoading'

import FiltersMenu from './FiltersMenu'

const socialBanner = require('assets/images/social-banner.png')

type PageType = {
  title: string;
  description?: string;
  withScroll?: boolean;
  withFooter?: boolean;
  withFilters?: boolean;
  headerChildren?: React.ReactNode;
  headerOptions?: HeaderProps;
}

const Page: React.FC<BoxProps & PageType> = ({
  children,
  title,
  description,
  withScroll = true,
  withFooter = true,
  headerChildren,
  headerOptions,
  ...props
}) => {
  const fullTitle = usePageTitle(title)
  const configuration = useConfiguration()
  const { theme: { header } } = useTheme()
  const { isMenuOpen, closeMenu } = useMenuState()
  const { isOpen: areFiltersOpen, close: closeFilters } = useFilterMenu()
  const { isLoading } = useLoading()
  const router = useRouter()

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

  console.log(router)

  return (
    <Box>
      <Head>
        <title>{fullTitle}</title>
        <meta name="description" content={description || configuration.getIn(['general', 'description'])} />
        <meta property="og:description" content={description || configuration.getIn(['general', 'description'])} />
        <meta property="twitter:description" content={description || configuration.getIn(['general', 'description'])} />
        <meta property="og:title" content={fullTitle} />
        <meta property="og:image" content={socialBanner} />
        <meta property="twitter:title" content={fullTitle} />
        <meta property="twitter:image" content={socialBanner} />

        <link
          rel="canonical"
          href={router.pathname}
          key="canonical"
        />
      </Head>

      <Box
        height={!withScroll ? '100vh' : { min: '100vh' }}
        {...props}
      >
        <Header {...headerOptions}>
          <AnimatePresence>
            {!isLoading && (
              <motion.div
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                style={{ height: '100%' }}
              >
                {headerChildren}
              </motion.div>
            )}
          </AnimatePresence>
        </Header>
        <LoadingWrapper>
          <MenuWrapper>
            <Stack>
              <FiltersMenu />
            </Stack>
            <Box fill={!withScroll}>
              <Box
                fill={!withScroll}
                pad={{ top: header.height }}
              >
                {children}
              </Box>
              {withFooter && (
                <Footer />
              )}
            </Box>
          </MenuWrapper>
        </LoadingWrapper>
      </Box>
    </Box>
  )
}

export default Page
