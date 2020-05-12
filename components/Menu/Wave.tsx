import React, { useEffect } from 'react'
import { motion, useAnimation } from 'framer-motion'
import styled from 'styled-components'

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
  fill: ${props => props.theme.global.colors.white};
`

const waveShape = {
  // closed: 'M0,0 L -20,0 Q 0,50 -50,100 L 0,100',
  open: 'M0,0 L 120,0 Q 120,50 120,100 L 0,100',
  closed: 'M0,0 L 0,0 Q -10,50 0,100 L 0,100'
}

const MenuWave: React.FC<MenuWaveProps> = ({ open = false }) => {
  const controls = useAnimation()

  useEffect(() => {
    controls.start({ d: open ? waveShape.open : waveShape.closed })
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
