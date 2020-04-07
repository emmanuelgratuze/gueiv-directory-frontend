import React, { useContext } from 'react'
import { Image, ImageProps } from 'grommet'
import { Transformation } from 'cloudinary-core'
import CloudinaryContext from './CloudinaryContext'

type Props = {
  fileName: string;
  cloudinaryOptions?: Transformation.Options;
}

const CloudinaryImage: React.FC<ImageProps & Props> = ({
  cloudinaryOptions,
  fileName,
  ...props
}) => {
  const { cloudinary } = useContext(CloudinaryContext)
  const url = cloudinary?.url(fileName.split('/')[1], cloudinaryOptions || {})

  return (
    <Image
      src={url}
      {...props}
    />
  )
}

export default CloudinaryImage
