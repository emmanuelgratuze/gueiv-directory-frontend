import { useContext } from 'react';
import { ResponsiveContext } from 'grommet';

export default function useResponsive() {
  const size = useContext(ResponsiveContext);
  const isSmallMobile = size === 'xxsmall' || size === 'xsmall';
  const isMobile = isSmallMobile || size === 'small';
  return {
    isMobile,
    isSmallMobile,
    size
  };
}
