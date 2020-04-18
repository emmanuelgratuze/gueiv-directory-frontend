import React from 'react'
import { Box, BoxProps, Button } from 'grommet'
import { Next, Previous } from 'grommet-icons'
import Icon from 'components/Icon'

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
  return (
    <Box
      fill
      pad="large"
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
              size="2.5rem"
            />
          </Box>
        )}
      </Button>
    </Box>
  )
}

export default CarouselButton
