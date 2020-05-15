import React from 'react'
import { Box, BoxProps } from 'grommet'
import Link from 'next/link'

import Heading from 'components/Heading'
import A from 'components/A'
import RelativeHeightBox from 'components/RelativeHeightBox'
import CriterionIcon from 'components/CriterionIcon'
import DynamicBackgroundColorBox from 'components/DynamicBackgroundColorBox'

import { ImmutableBrand } from 'types/data/brand'
import { ThemeColorsType } from 'themes/theme'
import useResponsive from 'hooks/generic/useResponsive'
import useTheme from 'hooks/generic/useTheme'
import useHover from 'hooks/generic/useHover'

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
  const [hoverRef, isHovered] = useHover()
  const { isSmallMobile } = useResponsive()

  return (
    <Box
      round="0.5rem"
      overflow="hidden"
      style={{ transform: 'translate3d(0,0,0)' }}
    >
      <Link href="/marcas/[slug]" as={`/marcas/${brand.get('slug')}`} prefetch={false}>
        <A ref={hoverRef}>
          <DynamicBackgroundColorBox color={color}>
            <RelativeHeightBox
              relativeHeight="50%"
              {...props}
            >
              <Box fill direction="row">
                <Box
                  width={isSmallMobile ? '45%' : '50%'}
                  overflow="hidden"
                >
                  <BrandImage
                    fill
                    brand={brand}
                    color={color}
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
                            color={color ? oppositeColors[color] : undefined}
                          />
                        </Box>
                      ))}
                    </Box>
                  )}
                </Box>
              </Box>
            </RelativeHeightBox>
          </DynamicBackgroundColorBox>
        </A>
      </Link>
    </Box>
  )
}

export default BrandPreview
