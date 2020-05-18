import React, { useEffect } from 'react'
import styled from 'styled-components'
import { Box } from 'grommet'
import { motion } from 'framer-motion'

import CloudinaryImage from 'components/cloudinary/CloudinaryImage'
import { ImageProps } from 'components/Image'
import { ImmutableBrand } from 'types/data/brand'
import { ThemeColorsType } from 'themes/theme'
import Loader from 'components/Loader'

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

const BrandImage: React.FC<BrandImageType & ImageProps> = ({
  brand,
  color,
  zoom = false,
  onPreload,
  ...props
}) => {
  useEffect(() => {
    if (!brand.get('pictures')?.size && onPreload) {
      onPreload()
    }
  }, [])
  return (
    <Box
      fill
      // background={{ color: color }}
    >
      {brand.get('pictures')?.size
        ? (
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
            <CloudinaryImage
              fit="cover"
              // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
              fileName={brand.get('pictures') ? brand.get('pictures')!.first() : ''}
              cloudinaryOptions={{
                height: 600,
                width: 600,
                crop: 'fit'
              }}
              loader={(
                <Loader color="white" />
              )}
              {...props}
            />
          </motion.div>
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
}

export default BrandImage
