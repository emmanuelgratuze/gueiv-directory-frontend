import { createSelector } from 'reselect'
import { DefaultRootState } from 'react-redux'
import { BrandColorsKeys } from 'themes/theme'
import { Record } from 'immutable'

import { ImmutableInterfaceTree } from './types'

export const selectInterfaceTree = (state: DefaultRootState): ImmutableInterfaceTree => (
  state.getIn(['interface'])
)

export const selectBrandsColors = createSelector<DefaultRootState, ImmutableInterfaceTree, Record<{ [key: string]: BrandColorsKeys }>>(
  selectInterfaceTree,
  (state) => (
    state.get('brandsColors')
  )
)

export const selectIsMenuOpen = createSelector(
  selectInterfaceTree,
  (state) => (
    state.get('isMenuOpen')
  )
)

export default {}
