import React from 'react'
import { Box, BoxProps } from 'grommet'
import CloudinaryImage from 'components/cloudinary/CloudinaryImage'

type CarouselImageProps = {
  fileName: string;
}

const CarouselImage: React.FC<BoxProps & CarouselImageProps> = ({
  fileName,
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
    />
  </Box>
)

export default CarouselImage
