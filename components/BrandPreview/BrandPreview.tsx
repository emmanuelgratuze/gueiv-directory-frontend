import React from 'react'
import { Box, BoxProps } from 'grommet'
import Link from 'next/link'

import Heading from 'components/Heading'
import Paragraph from 'components/Paragraph'

import RelativeHeightBox from 'components/RelativeHeightBox'
import CriterionIcon from 'components/CriterionIcon'
import DynamicBackgroundColorBox from 'components/DynamicBackgroundColorBox'
import A from 'components/A'

import { ImmutableBrand } from 'types/data/brand'
import { ThemeColorsType } from 'themes/theme'
import useResponsive from 'hooks/useResponsive'
import useTheme from 'hooks/useTheme'
import useHover from 'hooks/useHover'

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
    <Link href="/marcas/[slug]" as={`/marcas/${brand.get('slug')}`}>
      <A ref={hoverRef}>
        <DynamicBackgroundColorBox color={color}>
          <RelativeHeightBox
            relativeHeight="50%"
            {...props}
          >
            <Box fill direction="row">
              <Box width={isSmallMobile ? '45%' : '50%'}>
                <BrandImage
                  fill
                  brand={brand}
                  color={color}
                  zoom={isHovered}
                />
              </Box>
              <Box
                width={isSmallMobile ? '55%' : '50%'}
                pad={isSmallMobile ? 'medium' : { vertical: '2rem', horizontal: '2.2rem' }}
                justify="between"
              >

                <Box>
                  {/* Name */}
                  <Heading
                    level={2}
                    size="small"
                    transform="uppercase"
                    color={color ? oppositeColors[color] : undefined}
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

                {/* Description */}
                {!isSmallMobile && (
                  <Paragraph
                    size="small"
                    font="Lato"
                    color={color ? oppositeColors[color] : undefined}
                    length={50}
                  >
                    {brand.get('description')}
                  </Paragraph>
                )}

                {/* Criteria */}
                {brand.get('criteria') && (
                  <Box direction="row">
                    {brand.get('criteria').map((criterion) => (
                      <Box
                        key={criterion.get('id')}
                        width="1.5rem"
                        height="1.5rem"
                        margin={{ right: 'small', bottom: 'small' }}
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
  )
}

export default BrandPreview
