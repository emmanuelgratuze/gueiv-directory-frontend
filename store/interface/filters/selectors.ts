import { DefaultRootState } from 'react-redux'
import { List, Record, isImmutable } from 'immutable'
import { createSelector } from 'reselect'
import { memoize } from 'lodash'

import { ImmutableBrand } from 'types/data/brand'
import { selectData } from 'store/data/selectors'
import { selectBrands } from 'store/data/selectors/brands'
import { Filter } from './types'

export const selectFiltersMenuState = (state: DefaultRootState): Record<{ isOpen: boolean; filterId: string }> => (
  state.getIn(['interface', 'filters', 'menuState'])
)

export const selectCurrentFilters = (state: DefaultRootState): Record<{ [key: string]: List<string> }> => (
  state.getIn(['interface', 'filters', 'currentFiltersValues']) || List([])
)

export const selectAvailableFilters = (state: DefaultRootState): List<Filter> => (
  state.getIn(['interface', 'filters', 'availableFilters'])
)

export type FilterOption = {
  label: string;
  value: string;
}

type StandardDataEntity = Record<{
  id: string;
  name: string;
}>

export const selectFilterOptions = createSelector(
  selectData,
  selectAvailableFilters,
  (data, filters) => (
    memoize((filterId: string) => {
      if (!filterId) {
        return List([])
      }

      function getOptionsOfDataEntity(dataProperty: string): List<FilterOption> {
        const entities = data.get(dataProperty)

        if (!entities) {
          return List([])
        }

        const dataEntities = List<StandardDataEntity>(entities.valueSeq()).map((datum: StandardDataEntity) => ({
          label: datum.get('name'),
          value: datum.get('id')
        }))

        return dataEntities
      }

      const filterParams = filters.find((filter: Filter) => filter.get('id') === filterId)
      if (!filterParams) {
        return List([])
      }

      const filterOptions = getOptionsOfDataEntity(filterParams.get('dataEntity'))
        .sort((a, b) => (
          a.label.localeCompare(b.label)
        ))

      return filterOptions
    })
  )
)

type SelectorFunction = (currentFiltersValues: Record<{ [key: string]: List<string> }>, offset: number, limit: number) => { brands: List<ImmutableBrand>; totalLength: number; hasMore: boolean }

export const selectFilteredBrands = createSelector<DefaultRootState, List<ImmutableBrand>, List<Filter>, SelectorFunction>(
  [selectBrands, selectAvailableFilters],
  (brands, filters) => (
    memoize(
      (currentFiltersValues, offset = 0, limit = 20) => {
        let filteredBrands = brands

        Object.keys(currentFiltersValues.toJS())
          .forEach((filterId) => {
            filteredBrands = filteredBrands.filter(brand => {
              let keepIt = false
              const filterParams = filters.find((filter: Filter) => filter.get('id') === filterId)
              const propertyName = filterParams?.get('brandProperty') || ''

              if (brand.has(propertyName)) {
                const filterValues = currentFiltersValues.get(filterId)
                const brandValues = brand.get(propertyName)

                filterValues.some((filterValue) => {
                  let brandValueAsList: List<unknown>
                  if (!List.isList(brandValues)) {
                    brandValueAsList = List([brandValues])
                  } else {
                    brandValueAsList = brandValues
                  }
                  const brandValuesIds = brandValueAsList.map((val: unknown) => (
                    isImmutable(val) ? val.get('id') : val
                  ))
                  keepIt = brandValuesIds.includes(filterValue)

                  // will break the loop if keepit is true
                  return keepIt
                })
              }
              return keepIt
            })
          })

        return {
          brands: filteredBrands.slice(offset, offset + limit),
          totalLength: filteredBrands.size,
          hasMore: offset + limit < filteredBrands.size
        }
      },
      (...args) => JSON.stringify(args) // Memoization based on all the arguments
    )
  )
)

export default {}
