import React, { useEffect } from 'react'

import { Box } from 'grommet'
import { AnimatePresence, motion } from 'framer-motion'
import { useDispatch } from 'react-redux'
import InfiniteScroll from 'react-infinite-scroll-component'

import Page from 'components/Page'
import BrandPreview from 'components/BrandPreview/BrandPreview'
import Text from 'components/Text'
import Loader from 'components/Loader'
import FiltersControls from 'components/FiltersControls'

import { ThemeColorsType, BrandColorsKeys } from 'themes/theme'
import useResponsiveGrid from 'hooks/useResponsiveGrid'
import useTheme from 'hooks/useTheme'

import { setBrandsColors } from 'store/interface/actions'
import useFilteredBrands from 'hooks/useFilteredBrands'
import useFilters from 'hooks/userFilters'


type HomeScreenProps = {}

const HomeScreen: React.FC<HomeScreenProps> = () => {
  const { theme: { global: { brandColorsNames } } } = useTheme()
  const { getChildrenSize } = useResponsiveGrid({
    small: ['full'],
    medium: ['50%'],
    xlarge: ['33.33%']
  })
  const { brands, selectMore, hasMore } = useFilteredBrands()
  const { applyFiltersFromUrl } = useFilters()

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
          background={{ color: 'white' }}
          fill={brands.size === 0}
        >
          <AnimatePresence>
            <Box direction="row" wrap>
              <InfiniteScroll
                dataLength={brands.size}
                next={() => { selectMore() }}
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
                    width={getChildrenSize(index)}
                  >
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.6 }}
                    >
                      <BrandPreview
                        key={brand.get('id')}
                        brand={brand}
                        color={brandColorsNames[index % brandColorsNames.length] as keyof ThemeColorsType}
                      />
                    </motion.div>
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
                  fill
                  align="center"
                  justify="center"
                  background={{ color: 'light-turquoise' }}
                  pad="medium"
                >
                  <Text weight="bold" color="gray" textAlign="center">
                    No hemos encontrado marcas por tu criterios :(
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
