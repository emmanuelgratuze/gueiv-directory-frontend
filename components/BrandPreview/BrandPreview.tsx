import React from 'react'
import { Box, BoxProps, Stack } from 'grommet'
import Link from 'next/link'
import { motion } from 'framer-motion'

import A from 'components/A'

import { ImmutableBrand } from 'types/data/brand'
import { ColorsNamesWithOpposite } from 'themes/theme'
import useResponsive from 'hooks/generic/useResponsive'
import useHover from 'hooks/generic/useHover'

import BrandPreviewContent from './Content'

type BrandItemType = {
  brand: ImmutableBrand;
  color?: ColorsNamesWithOpposite;
  onLoad?: Function;
}

const ContentWrapper = motion.custom(Box)

const BrandPreview: React.FC<BoxProps & BrandItemType> = ({
  brand,
  color
}) => {
  const [hoverRef, isHovered] = useHover()
  const { isMobile } = useResponsive()

  return (
    <ContentWrapper
      round="0.5rem"
      overflow="hidden"
      style={{
        transform: 'translate3d(0,0,0)',
        opacity: !isMobile ? 0.9 : 1
      }}
      whileHover={{ opacity: 1 }}
      fill
    >
      <Stack
        fill
      >
        {/* Real content */}
        <BrandPreviewContent
          isHovered={isHovered}
          brand={brand}
          color={color}
        />

        {/* Link */}
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
