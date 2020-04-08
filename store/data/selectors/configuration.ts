
import { fromJS } from 'immutable'
import { ImmutableConfiguration } from 'types/data/configuration'
import { DefaultRootState } from 'react-redux'

export const selectConfiguration = (state: DefaultRootState): ImmutableConfiguration => (
  state.getIn(['data', 'configuration']) || fromJS({})
)

export default {}
