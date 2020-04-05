
import { fromJS } from 'immutable'
import { ImmutableAppState } from 'store/app/types'
import { ImmutableConfiguration } from 'types/data/configuration'

export const selectConfiguration = (state: ImmutableAppState): ImmutableConfiguration => (
  state.getIn(['data', 'configuration', 'general']) || fromJS({})
)

export default {}
