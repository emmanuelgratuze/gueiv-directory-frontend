import React, { useEffect, useState } from 'react'
import {
  Image as GrommetImage,
  ImageProps,
  Box,
  Stack
} from 'grommet'
import { Transformation } from 'cloudinary-core'
import { AnimatePresence, motion } from 'framer-motion'
import Loader from 'components/Loader'

type Props = {
  fileName: string;
  cloudinaryOptions?: Transformation.Options;
}

const AnimatedWrapper = motion.custom(Box)

const CloudinaryImage: React.FC<ImageProps & JSX.IntrinsicElements['img']> = ({
  src,
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    if (src) {
      const image = new Image()
      image.src = src
      image.onload = () => {
        setIsLoaded(true)
      }
    }
  }, [src])

  return (
    <AnimatePresence>
      <Stack fill>
        <AnimatedWrapper
          initial={{ opacity: 0 }}
          animate={{ opacity: !isLoaded ? 1 : 0 }}
          fill
          background={{ color: 'gray' }}
          align="center"
          justify="center"
        >
          <Loader />
        </AnimatedWrapper>
        {isLoaded && (
          <AnimatedWrapper
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            fill
          >
            <GrommetImage
              src={src}
              {...props}
            />
          </AnimatedWrapper>
        )}
      </Stack>
    </AnimatePresence>
  )
}

export default CloudinaryImage
