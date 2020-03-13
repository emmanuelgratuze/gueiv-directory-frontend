import React from 'react';
import PropTypes from 'prop-types';
import { Box } from 'grommet';
import useResponsive from '@hooks/useResponsive';

const defaultProps = {};
const propTypes = {};
type ContainerType = InferPropTypes<typeof propTypes, typeof defaultProps>

const Container: React.FC<ContainerType> = () => (
  <Box></Box>
);

Container.propTypes = propTypes;
Container.defaultProps = defaultProps;

export default Container;
