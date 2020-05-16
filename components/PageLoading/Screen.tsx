import React, { useEffect, useState, useCallback } from 'react'
import styled from 'styled-components'
import { useAnimation, AnimatePresence, motion } from 'framer-motion'
import { ThemeType } from 'themes/theme'

import useTheme from 'hooks/generic/useTheme'
import Loader from 'components/Loader'
import { Box } from 'grommet'

const Logo = require('assets/images/logo-unicolor.svg').ReactComponent

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
  const [logoColor, setLogoColor] = useState('yellow')

  useEffect(() => {
    controls.start({ opacity: animationPage !== currentPage ? 0 : 1 })
    if (animationPage !== currentPage) {
      setAnimationPage(currentPage)
    }
  }, [currentPage, isLoading])

  const handleColorChange = useCallback((color) => {
    setLogoColor(color)
  }, [])

  return (
    <AnimatePresence>
      <LoadingWrapper>
        <Box
          direction="column"
          align="center"
          justify="center"
        >
          <motion.div
            animate={{ fill: colors[logoColor] }}
            transition={{
              duration: 0.5
            }}
          >
            <Logo
              width="5rem"
              height="5rem"
            />
          </motion.div>
          <Loader
            width="3rem"
            onColorChange={handleColorChange}
          />
        </Box>
      </LoadingWrapper>
    </AnimatePresence>
  )
}

export default LoadingScreen
