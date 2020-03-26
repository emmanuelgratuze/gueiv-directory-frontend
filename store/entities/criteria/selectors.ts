import { RootStateOrAny } from 'react-redux'
import { List } from 'immutable'
import { createSelector } from 'reselect'

import { ImmutableCriterion } from './types'

export const selectCriteriaTree = (state: RootStateOrAny) => state.get('criteria')

export const selectCriteria = (state: RootStateOrAny): List<ImmutableCriterion> => (
  state.get('criteria').toIndexedSeq()
)

export const selectCriterionById = createSelector(
  selectCriteriaTree,
  (criteria) => (
    (id: string) => (
      criteria.get(id)
    )
  )
)
export default {}
