import { RootStateOrAny } from 'react-redux'
import { createSelector } from 'reselect'
import { ImmutableAppState } from './types'

export const selectApp = (state: RootStateOrAny): ImmutableAppState => (
  state.get('app')
)

export const selectAppConfig = createSelector(
  selectApp,
  (app) => app.getIn(['config'])
)

export const selectAppContents = createSelector(
  selectApp,
  (app) => app.getIn(['contents'])
)

export default {}
