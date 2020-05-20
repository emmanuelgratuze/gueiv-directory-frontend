import React, { useMemo } from 'react'
import { Box, BoxProps, Stack } from 'grommet'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { darken } from 'polished'

import Heading from 'components/Heading'
import A from 'components/A'
import RelativeHeightBox from 'components/RelativeHeightBox'
import CriterionIcon from 'components/CriterionIcon'

import { ImmutableBrand } from 'types/data/brand'
import { ColorsNamesWithOpposite } from 'themes/theme'
import useResponsive from 'hooks/generic/useResponsive'
import useTheme from 'hooks/generic/useTheme'
import useHover from 'hooks/generic/useHover'

import BrandImage from './Image'

type BrandItemType = {
  brand: ImmutableBrand;
  color?: ColorsNamesWithOpposite;
  onLoad?: Function;
}

const ContentWrapper = motion.custom(Box)

const BrandPreview: React.FC<BoxProps & BrandItemType> = ({
  brand,
  color,
  ...props
}) => {
  const { oppositeColors, colors } = useTheme()
  const [hoverRef, isHovered] = useHover()
  const { isSmallMobile, isMobile } = useResponsive()
  const backgroundColors = useMemo(() => ({
    normal: colors[color as string],
    hover: darken(0.05, colors[color as string])
  }), [color])

  return (
    <ContentWrapper
      round="0.5rem"
      overflow="hidden"
      style={{
        transform: 'translate3d(0,0,0)',
        opacity: !isMobile ? 0.9 : 1
      }}
      whileHover={{ opacity: 1 }}
    >
      <Stack
        fill
      >
        <RelativeHeightBox
          relativeHeight="50%"
          background={{ color: backgroundColors.normal }}
          fill
          {...props}
        >
          <Box
            fill
            direction="row"
          >
            <Box
              width={isSmallMobile ? '45%' : '50%'}
              overflow="hidden"
            >
              <BrandImage
                brand={brand}
                zoom={isHovered}
              />
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
              {brand.get('criteria') && (
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
        </RelativeHeightBox>
        <Link
          href="/marcas/[slug]"
          as={`/marcas/${brand.get('slug')}`}
          prefetch={false}
          passHref
        >
          <A ref={hoverRef}>
            <Box fill />
          </A>
        </Link>
      </Stack>
    </ContentWrapper>
  )
}

export default BrandPreview
