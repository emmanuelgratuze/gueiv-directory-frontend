import { RootStateOrAny } from 'react-redux'
import { createSelector } from 'reselect'
import { ImmutableAppState } from './types.d'

export const selectApp = (state: RootStateOrAny): ImmutableAppState => (
  state.get('app')
)

export const selectAppConfig = createSelector(
  selectApp,
  (app) => app.get('config')
)

export const selectAppContents = createSelector(
  selectApp,
  (app) => app.get('contents')
)

export default {}
