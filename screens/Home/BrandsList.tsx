import React, { useEffect, useState, useMemo } from 'react'
import { Box } from 'grommet'
import InfiniteScroll from 'react-infinite-scroll-component'
import { List } from 'immutable'
import { useDispatch } from 'react-redux'
import Loader from 'components/Loader'

import useResponsiveGrid from 'hooks/generic/useResponsiveGrid'
import useResponsive from 'hooks/generic/useResponsive'
import useTheme from 'hooks/generic/useTheme'

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
  const [loadedItemsCount, setLoadedItemsCount] = useState(0)
  const [displayedBrands, setDisplayedBrand] = useState<List<ImmutableBrand>>()

  // If all new brands items have been loaded,
  // push them in the displayedBrandItems array
  useEffect(() => {
    if (loadedItemsCount === brands.size - 1) {
      setDisplayedBrand(brands)
    }
  }, [loadedItemsCount, brands])

  return (
    <Box direction="row" wrap>
      <InfiniteScroll
        dataLength={displayedBrands ? displayedBrands.size : brands.size}
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
          position: 'relative',
          justifyContent: 'start'
        }}
        outerStyle={{ width: '100%' }}
      >
        {(displayedBrands || brands).map((brand, index) => (
          <BrandItem
            key={brand.get('id')}
            brand={brand}
            color={brandColorsNames[index % brandColorsNames.length] as keyof ThemeColorsType}
            width={isTablet || isMobile ? '30rem' : getChildrenSizeByIndex(index)}
          />
        ))}
      </InfiniteScroll>
    </Box>
  )
}

export default BrandsList
