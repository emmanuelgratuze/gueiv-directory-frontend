import { RootStateOrAny } from 'react-redux'
import { createSelector } from 'reselect'
import { denormalize } from 'normalizr'
import { List } from 'immutable'
import { memoize } from 'lodash'

import * as schemas from '~/store/schemas'
import { ImmutableBrand } from './types'

export const selectBrandsTree = (state: RootStateOrAny): List<ImmutableBrand> => state.get('brands')

export const selectBrands = createSelector(
  // TODO: select depending on the schema
  selectBrandsTree,
  (state) => state,
  (brands, state): List<ImmutableBrand> => {
    const res = state.get('brands')
      .filter((brand: ImmutableBrand) => !!brand.get('name'))
      .map((brand: ImmutableBrand) => denormalize(brand, schemas.brand, state))
      .toIndexedSeq()

    return res
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
