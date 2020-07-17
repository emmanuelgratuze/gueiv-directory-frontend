import React from 'react'
import { Box, BoxProps } from 'grommet'
import CloudinaryImage from 'components/cloudinary/CloudinaryImage'
import Loader from 'components/Loader'
import { ImageProps } from 'components/Image'

type CarouselImageProps = {
  fileName: string;
  imageProps?: ImageProps;
}

const CarouselImage: React.FC<BoxProps & CarouselImageProps> = ({
  fileName,
  imageProps = {},
  ...props
}) => (
  <Box
    fill
    align="center"
    justify="center"
    {...props}
  >
    <CloudinaryImage
      fit="cover"
      fileName={fileName}
      cloudinaryOptions={{
        height: 1400,
        width: 1400,
        crop: 'fit'
      }}
      loader={(
        <Loader color="white" />
      )}
      fill
      {...imageProps}
    />
  </Box>
)

export default CarouselImage
