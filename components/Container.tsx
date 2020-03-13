import React from 'react';
import PropTypes from 'prop-types';
import { Box } from 'grommet';
import useResponsive from '@hooks/useResponsive';

const defaultProps = {
  fluid: false
};

const propTypes = {
  fluid: PropTypes.bool
};

type ContainerType = InferPropTypes<typeof propTypes, typeof defaultProps>

const Container: React.FC<ContainerType> = ({
  children,
  fluid,
  ...props
}) => {
  const { isMobile } = useResponsive();
  return (
    <Box
      width="full"
      pad={{ horizontal: 'small' }}
      align="center"
      {...props}
    >
      <Box width={fluid ? 'full' : 'xlarge'} align="start" fill wrap>
        {children}
      </Box>
    </Box>
  );
}

Container.propTypes = propTypes;
Container.defaultProps = defaultProps;

export default Container;
