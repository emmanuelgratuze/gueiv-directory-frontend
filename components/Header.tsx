import React from 'react';
import { Box } from 'grommet';

import { ReactComponent as Logo } from '@assets/logo.svg';

const Header = () => (
  <Box>
    <Box background={{ color: 'light-2' }}>
      <Logo height="4rem" />
    </Box>

  </Box>
);

export default Header;
