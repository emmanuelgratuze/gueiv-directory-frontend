import React from 'react'
import { Box, Button } from 'grommet'
import styled from 'styled-components'
import Link from 'next/link'

import Container from 'components/Container'
import FiltersControls from 'components/FiltersControls'
import Text from 'components/Text'
import A from 'components/A'
import HamburgerIcon from 'components/HamburgerIcon'
import useTheme from 'hooks/useTheme'
import useMenuState from 'hooks/useMenuState'
import { Filter, Sort } from 'grommet-icons'
import useResponsive from 'hooks/useResponsive'
import useFilterMenu from 'hooks/useFilterMenu'

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

  const { isMobile } = useResponsive()
  const {
    isOpen: areFiltersOpen,
    toggle: toggleFilters
  } = useFilterMenu()

  return (
    <HeaderWrapper
      background={{ color: 'white' }}
      fill="horizontal"
      height={header.height}
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
                <HamburgerIcon open={isMenuOpen} />
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
                color="dark-3"
                size="0.9rem"
                spacing="large"
              >
                Directorio
              </Text>
            </Box>
          </Box>

          {/* Right part */}
          {withFilters ? (
            <>
              {isMobile ? (
                <Button
                  plain
                  onClick={() => toggleFilters(!areFiltersOpen ? 'criteria' : null)}
                >
                  <Box
                    fill="vertical"
                    width="3rem"
                    align="center"
                    justify="center"
                  >
                    {!areFiltersOpen ? (
                      <Filter color="gray" />
                    ) : (
                      <Sort color="blue" />
                    )}
                  </Box>
                </Button>
              ) : (
                <FiltersControls />
              )}
            </>
          ) : <Box />}
        </Box>

      </Container>
    </HeaderWrapper>
  )
}

export default Header
