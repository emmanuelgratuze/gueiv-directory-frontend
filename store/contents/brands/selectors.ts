
import { createSelector } from 'reselect'
import { denormalize } from 'normalizr'
import { List } from 'immutable'
import { memoize } from 'lodash'

import * as schemas from './node_modules/~/store/contents/schemas'
import { ImmutableBrand, BrandsStateTree } from './types'
import { ImmutableAppState } from './node_modules/~/store/contents/types'
import { selectEntities } from './node_modules/~/store/app/selectors'

export const selectBrandsTree = (state: ImmutableAppState): BrandsStateTree => (
  state.getIn(['entities', 'brands'])
)

export const selectBrands = createSelector(
  selectBrandsTree,
  selectEntities,
  (brands, entities) => {
    const result = brands
      .filter((brand: ImmutableBrand) => !!brand.get('name'))
      .map((brand: ImmutableBrand) => denormalize(brand, schemas.brand, entities))
      .toIndexedSeq()

    return List(result)
  }
)

export const selectBrandBySlug = createSelector(
  selectBrands,
  (brands) => (
    memoize((slug: string) => (
      brands.filter((brand) => (
        brand.get('slug') === slug
      ))?.get(0)
    ))
  )
)

export default {}
