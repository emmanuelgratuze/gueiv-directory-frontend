import React from 'react'
import { Box, BoxProps, Button } from 'grommet'
import { Next, Previous } from 'grommet-icons'
import Icon from 'components/Icon'
import useResponsive from 'hooks/generic/useResponsive'

type NavigationButtonProps = {
  side: 'previous' | 'next';
  color?: string;
}

const CarouselButton: React.FC<BoxProps & NavigationButtonProps> = ({
  side,
  color = 'black',
  ...props
}) => {
  const IconType = side === 'previous' ? Previous : Next
  const { isMobile } = useResponsive()
  return (
    <Box
      fill
      pad={isMobile ? 'medium' : 'large'}
    >
      <Button plain fill>
        {({ hover }: { hover: boolean }) => (
          <Box
            fill
            justify="center"
            align={side === 'next' ? 'end' : 'start'}
            {...props}
          >
            <Icon
              Component={IconType}
              color={hover ? color : 'white'}
              size={isMobile ? '2rem' : '2.5rem'}
            />
          </Box>
        )}
      </Button>
    </Box>
  )
}

export default CarouselButton
