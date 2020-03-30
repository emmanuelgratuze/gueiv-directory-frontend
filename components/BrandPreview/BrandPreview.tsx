import React from 'react'
import { Box, BoxProps } from 'grommet'
import Link from 'next/link'

import Heading from '~/components/generic/Heading'

import RelativeHeightBox from '~/components/RelativeHeightBox'

import { Brand } from '~/store/entities/brands/types'
import { ThemeColorsType } from '~/themes/theme'
import useTheme from '~/hooks/useTheme'

import BrandImage from './Image'
import CriterionIcon from '../CriterionIcon'

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
  return (
    <Link href="/marcas/[slug]" as={`/marcas/${brand.slug}`}>
      <a>
        <RelativeHeightBox
          relativeHeight="50%"
          background={{ color }}
          {...props}
        >
          <Box fill direction="row">
            <Box width="50%">
              <BrandImage
                fill
                brand={brand}
                color={color}
              />
            </Box>
            <Box
              width="50%"
              pad={{ vertical: 'large', horizontal: '2.2rem' }}
            >
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
                  margin={{ bottom: 'small' }}
                >
                  {brand.city}
                  &thinsp;
                  {brand.country?.name}
                </Heading>
              )}

              {/* Description */}
              {/* <Paragraph
                size="small"
                font="Lato"
                color={color ? oppositeColors[color] : undefined}
                length={100}
              >
                {brand.description}
              </Paragraph> */}

              {/* Criteria */}
              {brand.criteria && (
                <Box direction="row">
                  {brand.criteria.map((criterion) => (
                    <Box
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
      </a>
    </Link>
  )
}

export default BrandPreview
