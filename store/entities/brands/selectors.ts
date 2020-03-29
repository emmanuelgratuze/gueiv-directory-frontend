
import { createSelector } from 'reselect'
import { denormalize } from 'normalizr'
import { List } from 'immutable'
import { memoize } from 'lodash'

import * as schemas from '~/store/schemas'
import { ImmutableBrand, BrandsStateTree } from './types'
import { ImmutableAppState } from '~/store/app/types'
import { selectEntities } from '~/store/app/selectors'

export const selectBrandsTree = (state: ImmutableAppState): BrandsStateTree => (
  state.getIn(['entities', 'brands'])
)

export const selectBrands = createSelector(
  selectBrandsTree,
  selectEntities,
  (brands, entities) => {
    const res = brands
      .filter((brand: ImmutableBrand) => !!brand.get('name'))
      .map((brand: ImmutableBrand) => denormalize(brand, schemas.brand, entities))
      .toIndexedSeq()

    return List(res)
  }
)

export const selectBrandBySlug = createSelector(
  selectBrands,
  (state) => state,
  (brands) => (
    memoize((slug: string) => (
      brands.filter((brand) => brand.get('slug') === slug)?.get(0)
    ))
  )
)

export default {}
