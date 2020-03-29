import React from 'react'
import styled from 'styled-components'
import {
  Box,
  BoxProps,
  Image
} from 'grommet'
import { Brand } from '~/store/entities/brands/types'
import { ThemeColorsType } from '~/themes/theme'
import CriterionIcon from '../CriterionIcon'

const Logo = require('~/assets/images/logo-unicolor.svg').ReactComponent

type BrandImageType = {
  brand: Brand;
  color?: keyof ThemeColorsType;
}

const PlaceholderBox = styled(Box)`
  opacity: 1;
`

const BrandImage: React.FC<BoxProps & BrandImageType> = ({ brand, ...props }) => (
  <Box
    background={{ color: 'gray' }}
    {...props}
  >
    {brand.pictures?.length
      ? (
        <Image
          fit="cover"
          src={brand.pictures[0].url}
        />
      )
      : (
        <PlaceholderBox
          align="center"
          justify="center"
          fill
        >
          <Box width="xsmall" height="xsmall">
            {/* Criterion icon or Logo */}
            {brand.criteria.length
              ? <CriterionIcon criterion={brand.criteria[0]} />
              : <Logo height="100%" fill="black" />}
          </Box>
        </PlaceholderBox>
      )}
  </Box>
)

export default BrandImage
