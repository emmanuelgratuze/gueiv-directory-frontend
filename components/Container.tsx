import React from 'react'
import { Box, BoxProps } from 'grommet'

type ContainerType = {
  fluid: boolean;
}

const Container: React.FC<BoxProps & ContainerType> = ({
  children,
  fluid,
  ...props
}) => (
  <Box
    width="full"
    pad={{ horizontal: 'small' }}
    align="center"
    {...props}
  >
    <Box width={fluid ? 'full' : 'xlarge'} align="start" fill wrap>
      {children}
    </Box>
  </Box>
)

export default Container
