import { createSelector } from 'reselect'

import { InterfaceStateTree } from './types'
import { ImmutableAppState } from '~/store/app/types'

export const selectInterfaceTree = (state: ImmutableAppState): InterfaceStateTree => (
  state.getIn(['interface'])
)

export const selectBrandsColors = createSelector(
  selectInterfaceTree,
  (state) => (
    state.get('brandsColors')
  )
)

export default {}
