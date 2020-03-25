import React from 'react'
import { Box, BoxProps } from 'grommet'
import { Brand } from '~/store/entities/brands/types'
import Text from '~/components/Text'

type BrandItemType = {
  brand: Brand;
}

const BrandItem: React.FC<BoxProps & BrandItemType> = ({ brand, ...props }) => (
  <Box
    pad={{ bottom: '50%' }}
    border={{ color: 'light-2' }}
    {...props}
  >
    <Text>{brand.name}</Text>
  </Box>
)

export default BrandItem
