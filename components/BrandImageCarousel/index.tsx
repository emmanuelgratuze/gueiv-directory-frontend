import React from 'react'
import { Box, BoxProps } from 'grommet'

import { Brand } from '~/store/entities/brands/types'
import BrandImage from '../BrandPreview/Image'

type BrandImageCarouselProps = {
  brand: Brand;
  // color?: keyof ThemeColorsType;
}

const BrandImageCarousel: React.FC<BoxProps & BrandImageCarouselProps> = ({
  brand,
  // color,
  ...props
}) => (
  <Box
    fill
    {...props}
  >
    <BrandImage brand={brand} />
  </Box>
)

export default BrandImageCarousel
