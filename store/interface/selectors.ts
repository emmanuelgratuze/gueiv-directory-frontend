import { createSelector } from 'reselect'
import { ImmutableAppState } from 'store/app/types'

import { InterfaceTree } from './types'

export const selectInterfaceTree = (state: ImmutableAppState): InterfaceTree => (
  state.getIn(['interface'])
)

export const selectBrandsColors = createSelector(
  selectInterfaceTree,
  (state) => (
    state.get('brandsColors')
  )
)

export default {}
