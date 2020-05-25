import React from 'react'
import { Box } from 'grommet'
import styled from 'styled-components'
import { List } from 'immutable'
import { ListChildComponentProps } from 'react-window'

import useResponsive from 'hooks/generic/useResponsive'
import { ImmutableBrand } from 'types/data/brand'
import { ThemeColorsType } from 'themes/theme'

import BrandItem from './BrandItem'

interface BrandsLine extends ListChildComponentProps {
  data: List<{
    brand: ImmutableBrand;
    color: keyof ThemeColorsType;
    width: string;
  }>[];
  index: number;
}

const BrandsLine: React.FC<BrandsLine> = ({
  data,
  index: lineIndex,
  style
}) => {
  const items = data[lineIndex]
  const { isMobile, isTablet } = useResponsive()
  return (
    <div
      style={style}
    >
      <Box
        fill
        direction="row"
        pad={{ horizontal: '0.5rem' }}
        justify={isMobile || isTablet ? 'center' : undefined}
        wrap
      >
        {items.map((item) => (
          <BrandItem
            {...item}
            key={item.brand.get('id')}
          />
        ))}
      </Box>
    </div>
  )
}

export default BrandsLine
