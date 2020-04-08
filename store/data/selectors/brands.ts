
import { createSelector } from 'reselect'
import { denormalize } from 'normalizr'
import { List, Map, fromJS } from 'immutable'
import { memoize, MemoizedFunction } from 'lodash'
import { DefaultRootState } from 'react-redux'

import { selectData } from 'store/data/selectors'
import * as schemas from 'store/data/schemas'
import { ImmutableBrand } from 'types/data/brand'
import { ImmutableDataTree } from '../types'

/* eslint-disable no-spaced-func */
/* eslint-disable func-call-spacing */

export const selectBrandsTree = (state: DefaultRootState): Map<string, ImmutableBrand> => (
  state.getIn(['data', 'brands']) || fromJS({})
)

export const selectBrands = createSelector<DefaultRootState, Map<string, ImmutableBrand>, ImmutableDataTree, List<ImmutableBrand>>(
  [
    selectBrandsTree,
    selectData,
  ],
  (brands, entities) => {
    const result = brands
      .filter((brand: ImmutableBrand) => !!brand.get('name'))
      .map((brand: ImmutableBrand) => (
        denormalize(brand, schemas.brand, entities) as ImmutableBrand
      ))
      .valueSeq()

    return List(result)
  }
)

type SelectBrandBySlugFunction = ((slug: string) => ImmutableBrand | undefined) & MemoizedFunction
export const selectBrandBySlug = createSelector<DefaultRootState, List<ImmutableBrand>, SelectBrandBySlugFunction>(
  [selectBrands],
  (brands) => (
    memoize((slug: string) => (
      brands.filter((brand) => (
        brand.get('slug') === slug
      ))?.get(0)
    ))
  )
)

export default {}
