import React, { useEffect } from 'react'
import { Box, Button } from 'grommet'
import { AnimatePresence, motion } from 'framer-motion'
import { useDispatch } from 'react-redux'
import InfiniteScroll from 'react-infinite-scroll-component'

import Page from 'components/Page'
import BrandPreview from 'components/BrandPreview/BrandPreview'
import Text from 'components/Text'
import Loader from 'components/Loader'
import FiltersControls from 'components/FiltersControls'

import { ThemeColorsType, BrandColorsKeys } from 'themes/theme'
import useResponsiveGrid from 'hooks/generic/useResponsiveGrid'
import useResponsive from 'hooks/generic/useResponsive'
import useTheme from 'hooks/generic/useTheme'

import { setBrandsColors } from 'store/interface/actions'
import useFilteredBrands from 'hooks/app/brands/useFilteredBrands'
import useFilters from 'hooks/app/brands/useFilters'

const ItemWrapper = motion.custom(Box)

type HomeScreenProps = {}

const HomeScreen: React.FC<HomeScreenProps> = () => {
  const { theme: { global: { brandColorsNames } } } = useTheme()
  const { getChildrenSizeByIndex } = useResponsiveGrid({
    small: ['full'],
    medium: ['50%'],
    xlarge: ['33.33%']
  })
  const { brands, selectMore, hasMore } = useFilteredBrands()
  const { applyFiltersFromUrl } = useFilters()
  const { isMobile, isTablet } = useResponsive()

  const dispatch = useDispatch()
  useEffect(() => {
    if (brands.size) {
      const colors: { [key: string]: BrandColorsKeys } = {}
      brands.forEach((brand, index) => {
        colors[brand.get('id')] = brandColorsNames[index % brandColorsNames.length]
      })
      dispatch(setBrandsColors(colors))
    }
  }, [brands])

  useEffect(() => (
    applyFiltersFromUrl(window.location.href)
  ), [])

  return (
    <>
      <Page
        title="Home"
        withScroll={brands.size !== 0}
        headerChildren={(
          <Box fill="vertical" justify="center">
            <FiltersControls />
          </Box>
        )}
      >
        <Box
          height={brands.size !== 0 ? { min: '100vh' } : undefined}
          background={{ color: 'gray' }}
          fill={brands.size === 0}
          pad="0.5rem"
        >
          <AnimatePresence>
            <Box direction="row" wrap>
              <InfiniteScroll
                dataLength={brands.size}
                next={() => {
                  selectMore()
                }}
                hasMore={hasMore}
                loader={(
                  <Box width="100%" height="medium" align="center" justify="center">
                    <Loader />
                  </Box>
                )}
                endMessage={undefined}
                style={{
                  width: '100%',
                  display: 'flex',
                  flexWrap: 'wrap',
                  position: 'relative'
                }}
                outerStyle={{ width: '100%' }}
              >
                {brands.map((brand, index) => (
                  <Box
                    key={brand.get('id')}
                    width={getChildrenSizeByIndex(index)}
                  >
                    <Button plain>
                      {({ hover }: { hover: boolean }) => (
                        <ItemWrapper
                          initial={{ opacity: 0, transform: 'scale3d(0.98, 0.98, 1)' }}
                          animate={{ opacity: 1, transform: 'scale3d(1, 1, 1)' }}
                          exit={{ opacity: 0, transform: 'scale3d(0.98, 0.98, 1)' }}
                          transition={{ duration: 0.6 }}
                          style={{ zIndex: hover ? 2 : 1 }}
                          pad="0.4rem"
                          align="center"
                        >
                          <Box
                            fill
                            round="0.5rem"
                            overflow="hidden"
                            width={{ max: isTablet || isMobile ? '30rem' : undefined }}
                          >
                            <BrandPreview
                              key={brand.get('id')}
                              brand={brand}
                              color={brandColorsNames[index % brandColorsNames.length] as keyof ThemeColorsType}
                            />
                          </Box>
                        </ItemWrapper>
                      )}
                    </Button>
                  </Box>
                ))}
              </InfiniteScroll>
            </Box>
            <motion.div
              key="no-result"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
              style={{ width: '100%', height: '100%' }}
            >
              {brands && brands.size === 0 && (
                <Box
                  align="center"
                  justify="center"
                  pad="medium"
                  height={isMobile ? 'small' : 'large'}
                >
                  <Text size="large" weight="bold" color="pink" textAlign="center">
                    ¡Oops!
                    <br />
                    No hemos encontrado marcas por tu criterios
                  </Text>
                </Box>
              )}
            </motion.div>
          </AnimatePresence>
        </Box>
      </Page>
    </>
  )
}

export default HomeScreen
