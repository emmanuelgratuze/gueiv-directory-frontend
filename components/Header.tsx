import React from 'react'
import { Box } from 'grommet'

import Container from '~/components/Container'
import Text from '~/components/Text'

const Logo = require('~/assets/logo.svg').ReactComponent

const Header: React.FC = () => (
  <Box
    background={{ color: 'light-2' }}
    height="4rem"
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
          <Box>
            <Logo width="5rem" height="100%" />
          </Box>
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
  </Box>
)

export default Header
