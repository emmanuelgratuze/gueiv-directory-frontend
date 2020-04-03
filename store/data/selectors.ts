
import { createSelector } from 'reselect'
import { ImmutableAppState } from 'store/app/types.d'

import { ImmutableEntities } from './types.d'

export const selectEntities = createSelector<ImmutableAppState, ImmutableAppState, ImmutableEntities>(() => (
  (state) => state,
  (state) => (
    state.get('entities')
  )
))

export default {}