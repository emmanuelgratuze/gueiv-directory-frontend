import React from 'react'
import { Box, BoxProps, Button } from 'grommet'
import { Next, Previous } from 'grommet-icons'

type NavigationButtonProps = {
  side: 'previous' | 'next';
  color?: string;
}

const CarouselButton: React.FC<BoxProps & NavigationButtonProps> = ({
  side,
  color = 'black',
  ...props
}) => {
  const Icon = side === 'previous' ? Previous : Next
  return (
    <Box
      width="50"
      fill
      pad="large"
    >
      <Button plain fill>
        {({ hover }: { hover: boolean }) => (
          <Box
            fill
            justify="center"
            align={side === 'next' ? 'end' : undefined}
            {...props}
          >
            <Icon
              color={hover ? color : 'white'}
              size="large"
            />
          </Box>
        )}
      </Button>
    </Box>
  )
}

export default CarouselButton
