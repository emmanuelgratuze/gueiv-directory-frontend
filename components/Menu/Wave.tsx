import React, { useEffect } from 'react'
import { Box, Paragraph, Layer } from 'grommet'
import { motion, AnimatePresence, useAnimation } from 'framer-motion'
import styled from 'styled-components'

import useTheme from 'hooks/generic/useTheme'
import useConfiguration from 'hooks/app/useConfiguration'
import useResponsive from 'hooks/generic/useResponsive'

const Logo = require('assets/images/logo-white.svg').ReactComponent

type MenuWaveProps = {
  open?: boolean;
}

const WaveSVG = styled.svg`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10;
  width: 100vw;
  height: 100vh;
`

const WavePath = styled(motion.path)`
  fill: ${props => props.theme.global.colors.gray};
`

const waveShape = {
  open: 'M0,0 L 100,0 Q 120,50 100,100 L 0,100',
  closed: 'M0,0 L -20,0 Q 0,50 -50,100 L 0,100'
}

const MenuWave: React.FC<MenuWaveProps> = ({ open = false }) => {
  const { theme: { header } } = useTheme()
  const { isMobile } = useResponsive()
  const configuration = useConfiguration()
  const AnimatedBox = motion.custom(Box)

  const controls = useAnimation()

  // 'M1002.43261,1213.67261 C1250.22276,1101.88329 1405.42725,1017.93954 1452.67853,688.485469 C1499.92981,359.031395 1474.37078,233 1245.06979,81.4376066 C1015.76879,-70.1247868 439.3754,34.2739404 302.23414,55.6933706 C165.09288,77.1128008 4.13327225,135.838297 4.13327225,346.802917 C4.13327225,557.767536 -27.8359208,802.492704 86.0456502,860.317905 C199.927221,918.143106 52.4532421,1012.76414 263.280266,1086.25682 C474.10729,1159.7495 754.642455,1325.46193 1002.43261,1213.67261 Z'
  useEffect(() => {
    controls.start({
      d: open ? waveShape.open : waveShape.closed
    })
  }, [open])

  controls.mount()

  return (
    <WaveSVG
      viewBox="0 0 100 100"
      width="100%"
      height="100%"
      preserveAspectRatio="none"
    >
      <WavePath
        initial={{ d: waveShape.closed }}
        animate={controls}
        transition={{
          duration: 1,
          ease: 'easeInOut'
        }}
      />
    </WaveSVG>
  )
}

export default MenuWave
