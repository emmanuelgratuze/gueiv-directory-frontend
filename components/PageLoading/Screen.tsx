import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useAnimation, motion, AnimatePresence } from 'framer-motion'
import { ThemeType } from 'themes/theme'

import useTheme from 'hooks/generic/useTheme'

const Logo = require('assets/images/logo-unicolor.svg').ReactComponent

type Props = {
  theme: ThemeType;
}

const LoadingWrapper = styled(motion.div)`
  position: relative;
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

type LoadingScreenProps = {
  isLoading?: boolean;
  currentPage: string;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({
  isLoading = false,
  currentPage
}) => {
  const controls = useAnimation()
  const { theme: { global: { colors } } } = useTheme()
  const [animationPage, setAnimationPage] = useState<string>()

  useEffect(() => {
    controls.start({ opacity: animationPage !== currentPage ? 0 : 1 })
    if (animationPage !== currentPage) {
      setAnimationPage(currentPage)
    }
  }, [currentPage, isLoading])

  return (
    <AnimatePresence>
      <LoadingWrapper
        animate={controls}
      >
        <Logo
          width="5rem"
          height="100%"
          fill={colors.gray}
        />
      </LoadingWrapper>
    </AnimatePresence>
  )
}

export default LoadingScreen
