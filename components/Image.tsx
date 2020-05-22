import React, {
  useEffect,
  useState,
  createRef,
  useMemo
} from 'react'
import {
  Image as GrommetImage,
  ImageProps as GrommetImageProps,
  Box,
  Stack
} from 'grommet'
import styled from 'styled-components'
import Loader from 'components/Loader'
import useBrowser from 'hooks/generic/useBrowser'

export type ImageProps = GrommetImageProps & JSX.IntrinsicElements['img'] & {
  withLoader?: boolean;
  onPreload?: Function;
  onFailToLoad?: Function;
  loader?: JSX.Element;
}

const AnimatedWrapper = styled(Box)`
  transition: opacity 0.2s ease-out;
`

const CloudinaryImage: React.FC<ImageProps> = ({
  src,
  withLoader = true,
  onPreload,
  onFailToLoad,
  loader,
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isLoaderHidden, setIsLoaderHidden] = useState(false)
  const loaderRef = createRef<HTMLDivElement>()
  const { isServerSide } = useBrowser()

  useEffect(() => {
    // When has been hidden
    if (loaderRef.current) {
      loaderRef.current.addEventListener('transitionend', () => {
        setIsLoaderHidden(true)
      }, false)
    }
  }, [loaderRef.current])

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

  const shouldDisplayLoader = useMemo(() => (
    !isServerSide && withLoader
  ), [withLoader])

  return (
    <Box fill>
      {shouldDisplayLoader && (
        <Stack fill>
          <AnimatedWrapper
            ref={loaderRef}
            fill
            align="center"
            justify="center"
            style={{
              opacity: !isLoaded ? 1 : 0
            }}
          >
            {!isLoaderHidden && loader || <Loader />}
          </AnimatedWrapper>
          {/* {isLoaded && ( */}
          <AnimatedWrapper
            style={{
              opacity: isLoaded ? 1 : 0
            }}
            fill
          >
            <GrommetImage
              src={src}
              {...props}
            />
          </AnimatedWrapper>
        </Stack>
      )}
      {!shouldDisplayLoader && (
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
