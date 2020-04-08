import React from 'react'
import styled from 'styled-components'
import { Box, BoxProps } from 'grommet'
import { motion } from 'framer-motion'

import CloudinaryImage from 'components/cloudinary/CloudinaryImage'

import { ImmutableBrand } from 'types/data/brand'
import { ThemeColorsType } from 'themes/theme'
import CriterionIcon from '../CriterionIcon'

const Logo = require('assets/images/logo-unicolor.svg').ReactComponent

type BrandImageType = {
  brand: ImmutableBrand;
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
    {brand.get('pictures')?.size
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
            <Box
              width="100%"
              height="100%"
            >
              <CloudinaryImage
                fit="cover"
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                fileName={brand.get('pictures') ? brand.get('pictures')!.first() : ''}
                cloudinaryOptions={{
                  height: 600,
                  width: 600,
                  crop: 'fit'
                }}
              />
            </Box>
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
            {brand.get('criteria')?.size
              ? <CriterionIcon criterion={brand.get('criteria').first()} />
              : <Logo height="100%" fill="white" />}
          </Box>
        </PlaceholderBox>
      )}
  </Box>
)

export default BrandImage
