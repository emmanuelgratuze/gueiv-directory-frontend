import React, { useEffect, useState } from 'react'
import {
  Image as GrommetImage,
  ImageProps as GrommetImageProps,
  Box,
  Stack
} from 'grommet'
import { AnimatePresence, motion } from 'framer-motion'
import Loader from 'components/Loader'

export type ImageProps = GrommetImageProps & JSX.IntrinsicElements['img'] & {
  withLoader?: boolean;
  onPreload?: Function;
  onFailToLoad?: Function;
  loader?: JSX.Element;
}

const AnimatedWrapper = motion.custom(Box)

const CloudinaryImage: React.FC<ImageProps> = ({
  src,
  withLoader = true,
  onPreload,
  onFailToLoad,
  loader,
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    if (src && withLoader) {
      const image = new Image()
      image.src = src
      image.onload = () => {
        setIsLoaded(true)
      }
      image.onerror = () => {
        if (onFailToLoad) onFailToLoad()
      }

      return () => {
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        image.onload = () => {}
      }
    }
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    return () => {}
  }, [src])

  useEffect(() => {
    if (isLoaded && onPreload) {
      onPreload()
    }
  }, [isLoaded])

  return (
    <Box
      fill
    >
      {withLoader && (
        <AnimatePresence>
          <Stack fill>
            <AnimatedWrapper
              initial={{ opacity: 0 }}
              animate={{ opacity: !isLoaded ? 1 : 0 }}
              fill
              align="center"
              justify="center"
            >
              {loader || <Loader />}
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
      )}
      {!withLoader && (
        <GrommetImage
          src={src}
          onLoad={() => {
            if (onPreload) {
              onPreload()
            }
          }}
          {...props}
        />
      )}
    </Box>
  )
}

export default CloudinaryImage
