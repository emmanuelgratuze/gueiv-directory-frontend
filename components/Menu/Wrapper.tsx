import React, { useEffect } from 'react'
import { Stack, Box } from 'grommet'
import styled from 'styled-components'

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
    <Stack guidingChild={0}>
      {children}

      <MenuInnerWrapper open={isMenuOpen}>
        <MenuContent open={isMenuOpen} />
        <MenuWave open={isMenuOpen} />
      </MenuInnerWrapper>
    </Stack>
  )
}

export default MenuWrapper
