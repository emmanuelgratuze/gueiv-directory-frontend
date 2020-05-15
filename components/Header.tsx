import React from 'react'
import { Box, Button } from 'grommet'
import styled from 'styled-components'
import Link from 'next/link'

import Container from 'components/Container'
import Text from 'components/Text'
import A from 'components/A'
import HamburgerIcon from 'components/HamburgerIcon'
import useTheme from 'hooks/generic/useTheme'
import useMenuState from 'hooks/app/useMenuState'
import useResponsive from 'hooks/generic/useResponsive'
import useBodyScroll from 'hooks/generic/useBodyScroll'
import { motion } from 'framer-motion'

const Logo = require('assets/images/logo-white.svg').ReactComponent

const HeaderWrapper = styled(Box)`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 20;
`

type HeaderProps = {}

const Header: React.FC<HeaderProps> = ({ children }) => {
  const { theme: { header, global: { colors } } } = useTheme()
  const { isMenuOpen, toggleMenu } = useMenuState()
  const { y: scrollY } = useBodyScroll()

  const { isMobile } = useResponsive()

  return (
    <HeaderWrapper
      fill="horizontal"
      height={header.height}
    >
      <motion.div
        animate={{ backgroundColor: colors[scrollY < 10 ? 'gray' : 'dark-gray'] }}
      >
        <Container fill="vertical" fluid>
          <Box
            fill
            direction="row"
            justify="between"
          >
            {/* Left part */}
            <Box
              fill="vertical"
              direction="row"
              align="center"
              pad="small"
              gap="small"
            >
              <Box height="2rem" width="2rem">
                <Button plain onClick={() => toggleMenu()} fill>
                  <HamburgerIcon
                    color="white"
                    open={isMenuOpen}
                  />
                </Button>
              </Box>
              <Link href="/">
                <A>
                  <Box fill="vertical" align="center" justify="center">
                    <Logo height={isMobile ? '1.5rem' : '2rem'} />
                  </Box>
                </A>
              </Link>
              <Box>
                <Text
                  transform="uppercase"
                  weight={700}
                  color="light-3"
                  size="0.9rem"
                  spacing="large"
                >
                  Directorio
                </Text>
              </Box>
            </Box>

            {!isMenuOpen && (
              <Box>
                {children}
              </Box>
            )}
          </Box>
        </Container>
      </motion.div>
    </HeaderWrapper>
  )
}

export default Header
