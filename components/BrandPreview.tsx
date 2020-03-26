import React from 'react'
import { Box, BoxProps, Image } from 'grommet'

import RelativeHeightBox from '~/components/RelativeHeightBox'
import Text from '~/components/Text'

import { Brand } from '~/store/entities/brands/types'
import { ThemeColorsType } from '~/themes/theme'
import useTheme from '~/hooks/useTheme'

import BrandImage from './BrandImage'

type BrandItemType = {
  brand: Brand;
  color?: keyof ThemeColorsType;
}

const BrandPreview: React.FC<BoxProps & BrandItemType> = ({
  brand,
  color,
  ...props
}) => {
  const { oppositeColors } = useTheme()

  return (
    <RelativeHeightBox
      relativeHeight="50%"
      background={{ color }}
      {...props}
    >
      <Box fill direction="row">
        <Box width="50%">
          <BrandImage
            fill
            brand={brand}
            color={color}
          />
        </Box>
        <Box width="50%" pad="medium">
          <Text
            weight={600}
            transform="uppercase"
            size="large"
            color={color ? oppositeColors[color] : undefined}
          >
            {brand.name}
          </Text>
        </Box>
      </Box>
    </RelativeHeightBox>
  )
}

export default BrandPreview
