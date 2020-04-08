import React from 'react'
import { Box } from 'grommet'

type LoadingScreenProps = {}

const LoadingScreen: React.FC<LoadingScreenProps> = () => (
  <>
    <Box
      width="100vw"
      height="100vh"
      align="center"
      justify="center"
    >
      Loading
    </Box>
  </>
)

export default LoadingScreen
