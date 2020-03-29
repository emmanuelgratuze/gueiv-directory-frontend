import { RootStateOrAny } from 'react-redux'
import { createSelector } from 'reselect'
import { ImmutableAppState, ImmutableAppEntities } from './types'


export const selectAppConfig = createSelector(
  (state: ImmutableAppState): ImmutableAppState => state,
  (app) => app.getIn(['app', 'config'])
)

export const selectAppContents = createSelector(
  (state: ImmutableAppState): ImmutableAppState => state,
  (app) => app.getIn(['app', 'contents'])
)

export const selectEntities = (state: ImmutableAppState): ImmutableAppEntities => (
  state.get('entities') as ImmutableAppEntities
)

export default {}
