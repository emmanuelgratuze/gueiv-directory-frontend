import { useContext } from 'react'
import { ResponsiveContext } from 'grommet'
import { BreakpointsKeysType } from 'themes/theme'

type UseResponsiveType = {
  isMobile: boolean;
  isSmallMobile: boolean;
  isTablet: boolean;
  size: BreakpointsKeysType;
}

export default function useResponsive(): UseResponsiveType {
  const size = useContext(ResponsiveContext) as BreakpointsKeysType
  const isSmallMobile = size === 'xxsmall' || size === 'xsmall'
  const isMobile = isSmallMobile || size === 'small'
  const isTablet = isMobile || size === 'medium'
  return {
    isMobile,
    isSmallMobile,
    isTablet,
    size
  }
}
