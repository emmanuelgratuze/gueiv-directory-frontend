import React, { useState } from 'react'
import { Box, BoxProps, Stack } from 'grommet'
import { motion, AnimatePresence } from 'framer-motion'

import { Brand } from 'types/data/brand'
import CarouselImage from './Image'
import CarouselButton from './Button'

type BrandCarouselProps = {
  brand: Brand;
  color?: string;
}

const BrandCarousel: React.FC<BoxProps & BrandCarouselProps> = ({
  brand,
  color,
  ...props
}) => {
  const [currentIndex, setIndex] = useState(0)
  const picturesCount = brand.pictures?.length || 0
  return (
    <Box
      fill
      background={{ color: 'black' }}
      {...props}
    >

      <Stack fill>
        {/* Images */}
        <Box>
          <AnimatePresence>
            {brand.pictures?.map((fileName, index) => (
              <Box key={fileName}>
                {index === currentIndex && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <CarouselImage
                      fileName={fileName}
                    />
                  </motion.div>
                )}
              </Box>
            ))}
          </AnimatePresence>
        </Box>

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
    </Box>
  )
}

export default BrandCarousel
