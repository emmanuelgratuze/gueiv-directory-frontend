import React, { useEffect } from 'react'
import { Stack } from 'grommet'
import styled from 'styled-components'
import { motion } from 'framer-motion'

import useMenuState from 'hooks/app/useMenuState'
import useBodyScroll from 'hooks/generic/useBodyScroll'

import MenuWave from './Wave'
import MenuContent from './Content'


type InnerProps = {
  open: boolean;
}
const MenuInnerWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
  width: 100vw;
  height: 100vh;
  pointer-events: ${(props: InnerProps) => (props.open ? 'initial' : 'none')};
`

type MenuScreenProps = {}

const MenuWrapper: React.FC<MenuScreenProps> = ({ children }) => {
  const { isMenuOpen } = useMenuState()
  const { disableScroll, enableScroll } = useBodyScroll()

  useEffect(() => {
    if (isMenuOpen) {
      disableScroll()
    } else {
      enableScroll()
    }
  }, [isMenuOpen])

  return (
    <Stack guidingChild={1}>
      <motion.div
        animate={{
          opacity: isMenuOpen ? 0 : 1,
          filter: isMenuOpen ? 'blur(2px)' : 'none'
        }}
        transition={{
          duration: 1,
          delay: isMenuOpen ? 0 : 0.5
        }}
      >
        {children}
      </motion.div>

      <MenuInnerWrapper open={isMenuOpen}>
        <MenuContent open={isMenuOpen} />
        <MenuWave open={isMenuOpen} />
      </MenuInnerWrapper>
    </Stack>
  )
}

export default MenuWrapper
