import React, { useState } from 'react'
import { Box, BoxProps, Stack } from 'grommet'
import { motion, AnimatePresence } from 'framer-motion'

import BrandImage from 'components/BrandPreview/Image'

import { ImmutableBrand } from 'types/data/brand'
import { ColorsNames } from 'themes/theme'
import useResponsive from 'hooks/generic/useResponsive'

import CarouselImage from './Image'
import CarouselButton from './Button'

type BrandCarouselProps = {
  brand: ImmutableBrand;
  color: ColorsNames;
}

const BrandCarousel: React.FC<BoxProps & BrandCarouselProps> = ({
  brand,
  color,
  ...props
}) => {
  const [currentIndex, setIndex] = useState(0)
  const picturesCount = brand.get('pictures')?.size || 0
  const { isMobile } = useResponsive()

  return (
    <Box
      round={isMobile ? '1rem' : '2rem'}
      style={{ transform: 'translate3d(0,0,0)' }}
      overflow="hidden"
      background={{ color: 'gray' }}
      {...props}
    >
      {!brand.get('pictures')?.size && (
        <Box
          fill
          align="center"
          justify="center"
          background={{ color: 'gray' }}
        >
          <BrandImage
            fill
            brand={brand}
          />
        </Box>
      )}

      {brand.get('pictures')?.size && (
        <>
          <Stack fill>
            {/* Images */}
            <AnimatePresence>
              <Stack fill>
                {brand.get('pictures')?.map((fileName, index) => (
                  <Box
                    key={fileName}
                    fill
                    round={isMobile ? '1rem' : '2rem'}
                    overflow="hidden"
                  >
                    {index === currentIndex && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        style={{ height: '100%' }}
                      >
                        <CarouselImage
                          fileName={fileName}
                        />
                      </motion.div>
                    )}
                  </Box>
                ))}
              </Stack>
            </AnimatePresence>

            {/* Navigation */}
            {picturesCount > 1 && (
              <Box
                fill
                direction="row"
              >
                <CarouselButton
                  color={color}
                  side="previous"
                  onClick={() => setIndex(currentIndex === 0 ? picturesCount - 1 : currentIndex - 1)}
                />
                <CarouselButton
                  color={color}
                  side="next"
                  onClick={() => setIndex((currentIndex + 1) % picturesCount)}
                />
              </Box>
            )}
          </Stack>
        </>
      )}
    </Box>
  )
}

export default BrandCarousel
