import { createSelector } from 'reselect'
import { Map } from 'immutable'

import { ImmutableAppState } from 'store/app/types'
import { ImmutableCriterion } from 'types/data/criterion'

export const selectCriteriaTree = (state: ImmutableAppState): Map<string, ImmutableCriterion> => (
  state.getIn(['data', 'criteria'])
)

export const selectCriteria = createSelector(
  selectCriteriaTree,
  (state) => (
    state.getIn(['data', 'criteria']).toIndexedSeq()
  )
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
