import React from 'react'
import { Box } from 'grommet'
import styled from 'styled-components'
import Link from 'next/link'

import Container from 'components/Container'
import Text from 'components/Text'
import useTheme from 'hooks/useTheme'

const Logo = require('assets/images/logo.svg').ReactComponent

const HeaderWrapper = styled(Box)`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 20;
`

const Header: React.FC = () => {
  const { theme: { header } } = useTheme()

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
            <Link href="/">
              <Box fill="vertical">
                <a>
                  <Logo width="5rem" height="100%" />
                </a>
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
          <Box />
        </Box>

      </Container>
    </HeaderWrapper>
  )
}

export default Header
