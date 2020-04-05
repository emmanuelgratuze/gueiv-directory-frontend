
import { createSelector } from 'reselect'
import { denormalize } from 'normalizr'
import { List, Map, fromJS } from 'immutable'
import { memoize } from 'lodash'

import { ImmutableAppState } from 'store/app/types'
import { selectData } from 'store/data/selectors'
import * as schemas from 'store/data/schemas'
import { ImmutableBrand } from 'types/data/brand'

export const selectBrandsTree = (state: ImmutableAppState): Map<string, ImmutableBrand> => (
  state.getIn(['data', 'brands']) || fromJS({})
)

export const selectBrands = createSelector(
  selectBrandsTree,
  selectData,
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
