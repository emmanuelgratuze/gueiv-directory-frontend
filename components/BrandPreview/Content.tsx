import React, { useMemo, useState, useEffect } from 'react'
import { Box, BoxProps, Stack } from 'grommet'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { darken } from 'polished'

import Heading from 'components/Heading'
import CriterionIcon from 'components/CriterionIcon'

import { ImmutableBrand } from 'types/data/brand'
import { ColorsNamesWithOpposite } from 'themes/theme'
import useResponsive from 'hooks/generic/useResponsive'
import useTheme from 'hooks/generic/useTheme'

import BrandImage from './Image'

type BrandPreviewContentProps = {
  brand: ImmutableBrand;
  isHovered?: boolean;
  color?: ColorsNamesWithOpposite;
}

const BrandPreviewContent: React.FC<BrandPreviewContentProps & BoxProps> = ({
  brand,
  isHovered = false,
  color,
  ...props
}) => {
  const { colors, oppositeColors } = useTheme()
  const backgroundColors = useMemo(() => ({
    normal: colors[color as string],
    hover: darken(0.05, colors[color as string])
  }), [color])
  const { isSmallMobile } = useResponsive()

  const [afterDelay, setAfterDelay] = useState(false)
  useEffect(() => {
    const timeout = setTimeout(() => {
      setAfterDelay(true)
    }, 1000)
    return () => {
      clearTimeout(timeout)
    }
  }, [])

  return (
    <Box
      fill
      direction="row"
      background={{ color: backgroundColors.normal }}
      {...props}
    >
      <Box
        width={isSmallMobile ? '45%' : '50%'}
        overflow="hidden"
      >
        {afterDelay && (
          <BrandImage
            brand={brand}
            zoom={isHovered}
          />
        )}
      </Box>
      <Box
        width={isSmallMobile ? '55%' : '50%'}
        pad={isSmallMobile ? '0.9rem' : { vertical: '2rem', horizontal: '2.2rem' }}
        justify="between"
      >
        <Box>
          {/* Name */}
          <Heading
            level={2}
            transform="uppercase"
            color={color ? oppositeColors[color] : undefined}
            wordBreak
            margin={{ bottom: 'small' }}
          >
            {brand.get('name')}
          </Heading>

          {/* Location */}
          {brand.get('city') !== '' && brand.get('country') && (
            <Heading
              level={4}
              size="small"
              color={color ? oppositeColors[color] : undefined}
            >
              {brand.get('city') && `${brand.get('city')} `}
              {brand.getIn(['country', 'name'])}
            </Heading>
          )}
        </Box>

        {/* Criteria */}
        {afterDelay && brand.get('criteria') && (
          <Box direction="row" wrap>
            {brand.get('criteria').map((criterion) => (
              <Box
                key={criterion.get('id')}
                width="1.3rem"
                height="1.3rem"
                margin={{ right: 'small', bottom: 'xsmall' }}
              >
                <CriterionIcon
                  clickable
                  criterion={criterion}
                  color={color ? oppositeColors[color] as ColorsNamesWithOpposite : undefined}
                  style={{
                    position: 'relative',
                    zIndex: 10 // On top of the block link
                  }}
                />
              </Box>
            ))}
          </Box>
        )}
      </Box>
    </Box>
  )
}

export default BrandPreviewContent
