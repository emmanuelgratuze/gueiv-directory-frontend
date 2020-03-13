import React from 'react';
import { Box } from 'grommet';

import Container from '@components/Container';
import Text from '@components/Text';

import { ReactComponent as Logo } from '@assets/logo.svg';


const Header = () => (
  <Box
    background={{ color: 'light-2' }}
    height="5rem"
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
            <Logo width="6rem" height="100%" />
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
        <Box>
          
        </Box>
      </Box>

    </Container>
  </Box>
);

export default Header
