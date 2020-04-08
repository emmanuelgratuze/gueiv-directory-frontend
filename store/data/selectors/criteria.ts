import { createSelector } from 'reselect'
import { Map, List, fromJS } from 'immutable'
import { DefaultRootState } from 'react-redux'
import { ImmutableCriterion } from 'types/data/criterion'
import { ImmutableDataTree } from '../types'

export const selectCriteriaTree = (state: DefaultRootState): Map<string, ImmutableCriterion> => (
  state.getIn(['data', 'criteria']) || fromJS({})
)

export const selectCriteria = createSelector<DefaultRootState, Map<string, ImmutableCriterion>, List<ImmutableDataTree>>(
  selectCriteriaTree,
  (criteria) => (
    List(criteria.valueSeq())
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
