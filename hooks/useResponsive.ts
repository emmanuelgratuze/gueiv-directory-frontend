import { useContext } from 'react'
import { ResponsiveContext } from 'grommet'

type UseResponsiveType = {
  isMobile: boolean;
  isSmallMobile: boolean;
  size: string;
}

export default function useResponsive(): UseResponsiveType {
  const size = useContext(ResponsiveContext)
  const isSmallMobile = size === 'xxsmall' || size === 'xsmall'
  const isMobile = isSmallMobile || size === 'small'
  return {
    isMobile,
    isSmallMobile,
    size
  }
}
