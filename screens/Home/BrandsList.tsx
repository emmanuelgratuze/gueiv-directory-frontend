import React, { useEffect, useMemo } from 'react'
import { Box } from 'grommet'
import { List } from 'immutable'
import { useDispatch } from 'react-redux'
import InfiniteLoader from 'react-window-infinite-loader'

import useResponsiveGrid from 'hooks/generic/useResponsiveGrid'
import useResponsive from 'hooks/generic/useResponsive'
import useTheme from 'hooks/generic/useTheme'

import { BrandColorsKeys, ThemeColorsType } from 'themes/theme'
import { setBrandsColors } from 'store/interface/actions'

import { ImmutableBrand } from 'types/data/brand'

import { FixedSizeList } from 'react-window'
import AutoSizer from 'react-virtualized-auto-sizer'

import BrandsLine from './BrandsLine'

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

  const windowWidth = typeof window !== 'undefined' ? window.outerWidth : 1000
  const { getChildrenSizeByIndex: getWidth } = useResponsiveGrid({
    small: ['full'],
    medium: ['50%'],
    xlarge: ['33.33%']
  })
  const { getChildrenSizeByIndex: getHeight } = useResponsiveGrid({
    xsmall: [windowWidth * 0.5 * 1.2],
    small: [windowWidth * 0.5 / 1.5],
    medium: [windowWidth * 0.5 / 3.5],
    xlarge: [windowWidth * 0.5 / 4]
  })

  const { isMobile, isTablet, size } = useResponsive()
  const brandsChunks = useMemo(() => {
    const brandItems = brands.map((brand, index) => (
      {
        brand,
        color: brandColorsNames[index % brandColorsNames.length] as keyof ThemeColorsType,
        width: isTablet || isMobile ? '30rem' : getWidth(index)
      }
    ))

    let brandsPerLine = 3
    if (size === 'medium') {
      brandsPerLine = 2
    }
    if (size === 'small' || size === 'xsmall') {
      brandsPerLine = 1
    }
    const chunks = []
    for (let i = 0, j = brandItems.size; i < j; i += brandsPerLine) {
      chunks.push(brandItems.slice(i, i + brandsPerLine))
    }
    return chunks
  }, [brands, size])

  return (
    <Box
      fill
      flex={{ grow: 1 }}
    >
      <AutoSizer>
        {({ height, width }) => (
          <InfiniteLoader
            isItemLoaded={(index) => (
              !hasMore || index < brandsChunks.length - 1
            )}
            loadMoreItems={() => (
              selectMore()
            )}
            itemCount={brandsChunks.length}
            minimumBatchSize={30}
          >
            {({ onItemsRendered, ref }) => (
              <FixedSizeList
                onItemsRendered={onItemsRendered}
                ref={ref}
                height={height}
                width={width}
                itemCount={brandsChunks.length}
                itemSize={getHeight(0)}
                itemData={brandsChunks}
              >
                {BrandsLine}
              </FixedSizeList>
            )}
          </InfiniteLoader>
        )}
      </AutoSizer>
    </Box>
  )
}

export default BrandsList
