import React from 'react'
import { Box } from 'grommet'
import { InferPropTypes } from '~/types/utils'

const defaultProps = {}
const propTypes = {}
type ContainerType = InferPropTypes<typeof propTypes, typeof defaultProps>

const Container: React.FC<ContainerType> = () => (
  <Box />
)

Container.propTypes = propTypes
Container.defaultProps = defaultProps

export default Container
