import React, { useEffect, createRef, useMemo } from 'react'
import { Box } from 'grommet'
import styled from 'styled-components'
import { motion } from 'framer-motion'

import useMenuState from 'hooks/app/useMenuState'
import useBodyScroll from 'hooks/generic/useBodyScroll'
import useResponsive from 'hooks/generic/useResponsive'
import useBrowser from 'hooks/generic/useBrowser'

import MenuWave from './Wave'
import MenuContent from './Content'


type InnerProps = {
  open: boolean;
  isMobile: boolean;
}
const MenuInnerWrapper = styled(Box)<InnerProps>`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
  width: 100vw;
  height: 100vh;
  overflow-x: hidden;
  overflow-y: ${(props: InnerProps) => (props.open && props.isMobile ? 'auto' : 'hidden')};
  pointer-events: ${(props: InnerProps) => (props.open ? 'initial' : 'none')};
`

type MenuScreenProps = {}

const MenuWrapper: React.FC<MenuScreenProps> = ({ children }) => {
  const { isMenuOpen } = useMenuState()
  const menuRef = createRef<HTMLDivElement>()
  const { isMobile } = useResponsive()
  const { disableScroll, enableScroll } = useBodyScroll()
  const { isFirefox } = useBrowser()

  useEffect(() => {
    if (!menuRef.current) {
      return
    }
    if (isMenuOpen) {
      if (!isMobile) {
        disableScroll()
      } else {
        document.body.style.overflow = 'hidden'
      }
    } else {
      // eslint-disable-next-line no-lonely-if
      if (!isMobile) {
        enableScroll()
      } else {
        document.body.style.overflow = 'auto'
      }
    }
  }, [isMenuOpen, menuRef])

  const animationControls = useMemo(() => {
    const controls: { [key: string]: unknown } = {
      opacity: isMenuOpen ? 0 : 1,
    }
    if (!isFirefox) {
      controls.filter = isMenuOpen ? 'blur(2px)' : 'blur(0px)'
    }
    return controls
  }, [isMenuOpen, isFirefox])

  return (
    <div>
      <motion.div
        animate={animationControls}
        transition={{
          duration: 1,
          delay: isMenuOpen ? 0 : 0.5
        }}
      >
        {children}
      </motion.div>

      <MenuInnerWrapper
        open={isMenuOpen}
        isMobile={isMobile}
        ref={menuRef}
        pad={{ bottom: isMobile ? '7rem' : 'none' }}
      >
        <MenuContent open={isMenuOpen} />
        <MenuWave open={isMenuOpen} />
      </MenuInnerWrapper>
    </div>
  )
}

export default MenuWrapper
