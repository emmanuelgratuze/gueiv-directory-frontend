import React from 'react'
import { Box, Button } from 'grommet'
import styled from 'styled-components'
import Link from 'next/link'

import Container from 'components/Container'
import BrandsFilter from 'components/FiltersControls'
import Text from 'components/Text'
import A from 'components/A'
import HamburgerIcon from 'components/HamburgerIcon'
import useTheme from 'hooks/useTheme'
import useMenuState from 'hooks/useMenuState'

const Logo = require('assets/images/logo.svg').ReactComponent

const HeaderWrapper = styled(Box)`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 20;
`

type HeaderProps = {
  withFilters?: boolean;
}

const Header: React.FC<HeaderProps> = ({ withFilters = false }) => {
  const { theme: { header } } = useTheme()
  const { isMenuOpen, toggleMenu } = useMenuState()

  return (
    <HeaderWrapper
      background={{ color: 'light-2' }}
      fill="horizontal"
      height={header.height}
    >
      <Container fill="vertical" fluid>
        <Box
          fill="horizontal"
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
                <HamburgerIcon open={isMenuOpen} />
              </Button>
            </Box>
            <Link href="/">
              <Box fill="vertical">
                <A>
                  <Logo width="5rem" height="100%" />
                </A>
              </Box>
            </Link>
            <Box>
              <Text
                transform="uppercase"
                weight={700}
                color="dark-3"
                size="0.9rem"
              >
                Directorio
              </Text>
            </Box>
          </Box>

          {/* Right part */}
          {withFilters ? <BrandsFilter /> : <Box />}
        </Box>

      </Container>
    </HeaderWrapper>
  )
}

export default Header
