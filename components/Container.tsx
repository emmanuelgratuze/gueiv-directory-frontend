import React from 'react'
import PropTypes from 'prop-types'
import { Box } from 'grommet'
import { InferPropTypes } from '~/types/app.d'

const defaultProps = {
  fluid: false,
  children: null
}

const propTypes = {
  fluid: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
}

type ContainerType = InferPropTypes<typeof propTypes, typeof defaultProps>

const Container: React.FC<ContainerType> = ({
  children,
  fluid,
  ...props
}) => (
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
)

Container.propTypes = propTypes
Container.defaultProps = defaultProps

export default Container
