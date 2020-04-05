import React from 'react'
import { Box, BoxProps } from 'grommet'
import Link from 'next/link'

import Heading from 'components/Heading'
import Paragraph from 'components/Paragraph'

import RelativeHeightBox from 'components/RelativeHeightBox'

import { Brand } from 'types/data/brand'
import { ThemeColorsType } from 'themes/theme'
import useTheme from 'hooks/useTheme'
import useHover from 'hooks/useHover'

import BrandImage from './Image'
import CriterionIcon from '../CriterionIcon'
import DynamicBackgroundColorBox from '../visual/DynamicBackgroundColorBox'

type BrandItemType = {
  brand: Brand;
  color?: keyof ThemeColorsType;
}

const BrandPreview: React.FC<BoxProps & BrandItemType> = ({
  brand,
  color,
  ...props
}) => {
  const { oppositeColors } = useTheme()
  const [hoverRef, isHovered] = useHover()

  return (
    <Link href="/marcas/[slug]" as={`/marcas/${brand.slug}`}>
      <a ref={hoverRef}>
        <DynamicBackgroundColorBox color={color}>
          <RelativeHeightBox
            relativeHeight="50%"
            {...props}
          >
            <Box fill direction="row">
              <Box width="50%">
                <BrandImage
                  fill
                  brand={brand}
                  color={color}
                  zoom={isHovered}
                />
              </Box>
              <Box
                width="50%"
                pad={{ vertical: '2rem', horizontal: '2.2rem' }}
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
                    {brand.name}
                  </Heading>

                  {/* Location */}
                  {brand.city !== '' && brand.country && (
                    <Heading
                      level={3}
                      size="small"
                      color={color ? oppositeColors[color] : undefined}
                    >
                      {brand.city && `${brand.city} `}
                      {brand.country?.name}
                    </Heading>
                  )}
                </Box>

                {/* Description */}
                <Paragraph
                  size="small"
                  font="Lato"
                  color={color ? oppositeColors[color] : undefined}
                  length={50}
                >
                  {brand.description}
                </Paragraph>

                {/* Criteria */}
                {brand.criteria && (
                  <Box direction="row">
                    {brand.criteria.map((criterion) => (
                      <Box
                        key={criterion.id}
                        width="1.5rem"
                        height="1.5rem"
                        margin={{ right: 'small', bottom: 'small' }}
                      >
                        <CriterionIcon
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
      </a>
    </Link>
  )
}

export default BrandPreview
