import React from 'react'
import { Box, BoxProps } from 'grommet'
import Link from 'next/link'

import RelativeHeightBox from '~/components/RelativeHeightBox'
import Text from '~/components/Text'

import { ImmutableBrand } from '~/store/entities/brands/types'
import { ThemeColorsType } from '~/themes/theme'
import useTheme from '~/hooks/useTheme'

import BrandImage from './Image'

type BrandItemType = {
  brand: ImmutableBrand;
  color?: keyof ThemeColorsType;
}

const BrandPreview: React.FC<BoxProps & BrandItemType> = ({
  brand,
  color,
  ...props
}) => {
  const { oppositeColors } = useTheme()
  return (
    <Link href="/marcas/[slug]" as={`/marcas/${brand.get('slug')}`}>
      <a>
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
                {brand.get('name')}
              </Text>
            </Box>
          </Box>
        </RelativeHeightBox>
      </a>
    </Link>
  )
}

export default BrandPreview
