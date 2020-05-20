import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

import Loader from 'components/Loader'
import { Box } from 'grommet'
import { motion } from 'framer-motion'

type Props = {
  visible?: boolean;
}

const LoadingWrapper = motion.custom(
  styled.div<Props>`
    position: fixed;
    top: 0;
    left: 0;
    z-index: 16;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    background-color: ${(props) => props.theme.global.colors.gray};
    pointer-events: none;
  `
)

type LogoProps = {
  colors: string[];
}

type LoadingScreenProps = {
  isLoading?: boolean;
  currentPage: string;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({
  isLoading = false
}) => {
  const [isVisible, setVisibility] = useState(false)

  useEffect(() => {
    setVisibility(true)
  }, [])

  return (
    <LoadingWrapper
      animate={{ opacity: isVisible && isLoading ? 1 : 0 }}
    >
      <Box
        direction="column"
        align="center"
        justify="center"
      >
        <Loader />
      </Box>
    </LoadingWrapper>
  )
}

export default LoadingScreen
