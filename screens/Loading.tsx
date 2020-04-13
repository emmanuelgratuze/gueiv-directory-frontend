import React from 'react'
import styled from 'styled-components'
import { AnimatePresence, motion } from 'framer-motion'
import { ThemeType } from 'themes/theme'

const Logo = require('assets/images/logo-unicolor.svg').ReactComponent

type LoadingScreenProps = {}

type Props = {
  theme: ThemeType;
}

const AnimatedWrapper = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 30;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  background-color: ${(props) => props.theme.global.colors['light-2']};
  transform-origin: top;

  svg {
    fill: ${(props) => props.theme.global.colors['light-4']};
  }
`

const LoadingScreen: React.FC<LoadingScreenProps> = () => (
  <AnimatePresence>
    <AnimatedWrapper
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{
        duration: 0.4,
        ease: 'easeOut'
      }}
    >
      <Logo
        width="5rem"
        height="100%"
        color="black"
      />
    </AnimatedWrapper>
  </AnimatePresence>
)

export default LoadingScreen
