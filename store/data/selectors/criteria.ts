import { createSelector } from 'reselect'

import { CriteriaStateTree } from '../criteria/types'
import { ImmutableAppState } from '~/store/data/types'

export const selectCriteriaTree = (state: ImmutableAppState): CriteriaStateTree => (
  state.getIn(['entities', 'criteria'])
)

export const selectCriteria = createSelector(
  selectCriteriaTree,
  (state) => (
    state.getIn(['entities', 'criteria']).toIndexedSeq()
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
