import React, { useEffect } from 'react'
import { Box } from 'grommet'
import InfiniteScroll from 'react-infinite-scroll-component'
import { List } from 'immutable'
import { useDispatch } from 'react-redux'
import { motion } from 'framer-motion'

import useResponsiveGrid from 'hooks/generic/useResponsiveGrid'
import useResponsive from 'hooks/generic/useResponsive'
import useTheme from 'hooks/generic/useTheme'
import useBrowser from 'hooks/generic/useBrowser'
import Loader from 'components/Loader'

import { BrandColorsKeys, ThemeColorsType } from 'themes/theme'
import { setBrandsColors } from 'store/interface/actions'

import { ImmutableBrand } from 'types/data/brand'

import BrandItem from './BrandItem'

type BrandsListProps = {
  brands: List<ImmutableBrand>;
  selectMore: Function;
  hasMore: boolean;
}

const BrandsList: React.FC<BrandsListProps> = ({
  brands,
  selectMore,
  hasMore
}) => {
  const { theme: { global: { brandColorsNames } } } = useTheme()
  const dispatch = useDispatch()

  // Save each brand color in store
  // Allow getting the same color in the brand page
  useEffect(() => {
    if (brands.size) {
      const colors: { [key: string]: BrandColorsKeys } = {}
      brands.forEach((brand, index) => {
        colors[brand.get('id')] = brandColorsNames[index % brandColorsNames.length]
      })
      dispatch(setBrandsColors(colors))
    }
  }, [brands])

  const { getChildrenSizeByIndex } = useResponsiveGrid({
    small: ['full'],
    medium: ['50%'],
    xlarge: ['33.33%']
  })
  const { isMobile, isTablet } = useResponsive()
  const { isServerSide } = useBrowser()

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: isServerSide ? 0 : 1 }}
    >
      <Box
        fill
        flex={{ grow: 1 }}
      >
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
            // width: '100%',
            display: 'flex',
            flexWrap: 'wrap',
            position: 'relative',
            justifyContent: isMobile || isTablet ? 'center' : 'start'
          }}
          outerStyle={{ width: '100%' }}
        >
          {brands.map((brand, index) => (
            <BrandItem
              key={brand.get('id')}
              brand={brand}
              color={brandColorsNames[index % brandColorsNames.length] as keyof ThemeColorsType}
              width={isTablet || isMobile ? '30rem' : getChildrenSizeByIndex(index)}
            />
          ))}
        </InfiniteScroll>
      </Box>
    </motion.div>
  )
}

export default BrandsList
