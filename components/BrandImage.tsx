import React from 'react'
import styled from 'styled-components'
import { darken } from 'polished'
import {
  Box,
  BoxProps,
  Image
} from 'grommet'
import { Brand } from '~/store/entities/brands/types'
import { ThemeColorsType } from '~/themes/theme'
import useTheme from '~/hooks/useTheme'

const Logo = require('~/assets/images/logo-unicolor.svg').ReactComponent

type BrandImageType = {
  brand: Brand;
  color?: keyof ThemeColorsType;
}

const PlaceholderBox = styled(Box)`
  opacity: 0.2;
`

const BrandImage: React.FC<BoxProps & BrandImageType> = ({
  brand,
  color,
  ...props
}) => {
  const { colors } = useTheme()
  return (
    <Box
      background={{ color: color ? darken(0.1, colors[color]) : 'none' }}
      {...props}
    >
      {brand.pictures && brand.pictures.length > 0
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
            height="100%"
            width="100%"
          >
            <Box width="xsmall">
              {brand.criteria
                && brand.criteria.length
                && brand.criteria[0] !== null
                && brand.criteria[0].icon
                && brand.criteria[0].icon.url
                ? (
                  <Image src={brand.criteria[0].icon.url} alt={brand.name} />
                ) : (
                  <Logo />
                )}
            </Box>
          </PlaceholderBox>
        )}
    </Box>
  )
}

export default BrandImage
