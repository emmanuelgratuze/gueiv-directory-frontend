import { useCallback, useMemo } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { List } from 'immutable'
import { selectFilterOptions, FilterOption, selectCurrentFilters } from 'store/interface/filters/selectors'
import { applyFilter, removeFilter } from 'store/interface/filters/actions'

type ReturnedValue = {
  filterValue: List<string>;
  addFilter: Function;
  removeFilters: Function;
  filterOptions: List<FilterOption>;
  filterId: string;
}

const useFilter = (filterId: string): ReturnedValue => {
  const dispatch = useDispatch()
  const filterOptions = useSelector(
    (state) => selectFilterOptions(state)(filterId)
  )
  const currentFiltersValues = useSelector(selectCurrentFilters)
  const filterValue = useMemo(() => (
    currentFiltersValues.get(filterId) || List([])
  ), [currentFiltersValues, filterId])

  // Didn't figure out how to use filtername hook's scope value
  const addFilter = useCallback((newFilterValue) => {
    dispatch(applyFilter(filterId, newFilterValue))
  }, [filterId])

  const removeFilters = useCallback(() => {
    dispatch(removeFilter(filterId))
  }, [filterId])

  return {
    filterId,
    filterValue,
    addFilter,
    removeFilters,
    filterOptions,
  }
}

export default useFilter
