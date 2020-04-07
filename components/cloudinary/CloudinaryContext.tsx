import React, { createContext, useMemo } from 'react'
import { Cloudinary } from 'cloudinary-core'

const CloudinaryContext = createContext<{
  cloudinary?: Cloudinary;
}>({})

type Props = {
  cloudName: string;
}
export const CloudinaryProvider: React.FC<Props> = ({ cloudName, ...props }) => {
  const cloudinary = useMemo(() => (
    // eslint-disable-next-line @typescript-eslint/camelcase
    new Cloudinary({ cloud_name: cloudName })
  ), [cloudName])
  return (
    <CloudinaryContext.Provider value={{ cloudinary }} {...props} />
  )
}

export default CloudinaryContext
