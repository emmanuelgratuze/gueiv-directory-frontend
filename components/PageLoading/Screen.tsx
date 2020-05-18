import React, { useEffect, useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { ThemeType } from 'themes/theme'
import styled from 'styled-components'

import Loader from 'components/Loader'
import { Box } from 'grommet'

type Props = {
  theme: ThemeType;
}

const LoadingWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 30;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  pointer-events: none;
`

type LogoProps = {
  colors: string[];
}

type LoadingScreenProps = {
  isLoading?: boolean;
  currentPage: string;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({
  isLoading = false,
  currentPage
}) => {
  const [animationPage, setAnimationPage] = useState<string>()

  useEffect(() => {
    // controls.start({ opacity: animationPage !== currentPage ? 0 : 1 })
    if (animationPage !== currentPage) {
      setAnimationPage(currentPage)
    }
  }, [currentPage, isLoading])

  return (
    <AnimatePresence>
      <LoadingWrapper>
        <Box
          direction="column"
          align="center"
          justify="center"
        >
          <Loader />
        </Box>
      </LoadingWrapper>
    </AnimatePresence>
  )
}

export default LoadingScreen
