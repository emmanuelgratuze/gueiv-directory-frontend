import React, { useEffect, createRef } from 'react'
import { Box } from 'grommet'
import styled from 'styled-components'

import useMenuState from 'hooks/app/useMenuState'
import useBodyScroll from 'hooks/generic/useBodyScroll'
import useResponsive from 'hooks/generic/useResponsive'

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
  z-index: 18;
  width: 100vw;
  height: 100vh;
  padding-bottom: ${(props: InnerProps) => (props.open && props.isMobile ? '10rem' : 'none')};
  overflow-x: hidden;
  overflow-y: ${(props: InnerProps) => (props.open && props.isMobile ? 'auto' : 'hidden')};
  background-color: ${(props) => (props.open ? props.theme.global.colors.gray : 'transparent')};
  transition: background-color 0.3s ease-out;
  pointer-events: ${(props: InnerProps) => (props.open ? 'initial' : 'none')};
`

type MenuScreenProps = {}

const MenuWrapper: React.FC<MenuScreenProps> = ({ children }) => {
  const { isMenuOpen } = useMenuState()
  const menuRef = createRef<HTMLDivElement>()
  const { isMobile } = useResponsive()
  const { disableScroll, enableScroll } = useBodyScroll()

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

  return (
    <div>
      {children}

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
