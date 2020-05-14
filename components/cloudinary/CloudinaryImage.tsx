import React, { useContext } from 'react'
import { ImageProps } from 'grommet'
import { Transformation } from 'cloudinary-core'

import Image from 'components/Image'

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

  let derivedFileName = fileName
  if (fileName.includes(`https://res.cloudinary.com/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload/`)) {
    // https://res.cloudinary.com/dq9k7gnud/image/upload/<filename>
    [, derivedFileName] = fileName.split(`https://res.cloudinary.com/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload/`)
  } else {
    // assets/<filename>
    [, derivedFileName] = fileName.split('/')
  }

  const url = cloudinary?.url(derivedFileName, cloudinaryOptions || {})

  return (
    <Image
      src={url}
      {...props}
    />
  )
}

export default CloudinaryImage
