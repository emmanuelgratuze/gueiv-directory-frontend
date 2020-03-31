import React from 'react'
import styled from 'styled-components'
import {
  Box,
  BoxProps,
  Image
} from 'grommet'
import { motion } from 'framer-motion'

import { Brand } from '~/store/entities/brands/types'
import { ThemeColorsType } from '~/themes/theme'
import CriterionIcon from '../CriterionIcon'

const Logo = require('~/assets/images/logo-unicolor.svg').ReactComponent

type BrandImageType = {
  brand: Brand;
  color?: keyof ThemeColorsType;
  zoom?: boolean;
}

const PlaceholderBox = styled(Box)`
  opacity: 1;
`

const BrandImage: React.FC<BoxProps & BrandImageType> = ({
  brand,
  color,
  zoom = false,
  ...props
}) => (
  <Box
    fill
    background={{ color: color || 'gray' }}
    {...props}
  >
    {brand.pictures?.length
      ? (
        <Box
          width="100%"
          height="100%"
          overflow="hidden"
          align="center"
          justify="center"
        >
          <motion.div
            animate={{
              transform: `scale(${zoom ? '1.1' : '1'})`
            }}
            transition={{
              duration: 0.3,
              ease: 'easeOut'
            }}
            style={{
              height: '100%',
              width: '100%',
              transform: 'scale(1)'
            }}
          >
            <Image
              width="100%"
              height="100%"
              fit="cover"
              src={brand.pictures[0].url}
            />
          </motion.div>
        </Box>
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
              : <Logo height="100%" fill="white" />}
          </Box>
        </PlaceholderBox>
      )}
  </Box>
)

export default BrandImage
