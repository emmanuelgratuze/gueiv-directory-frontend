import {
  useCallback,
  useMemo
} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { List } from 'immutable'
import { selectFilterOptions, FilterOption, selectCurrentFilters } from 'store/interface/filters/selectors'
import { applyFilter } from 'store/interface/filters/actions'

type ReturnedValue = {
  filterValue: List<string>;
  setFilterValue: Function;
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
  const setFilterValue = useCallback((newFilterValue) => {
    dispatch(applyFilter(filterId, newFilterValue))
  }, [filterId])

  return {
    filterId,
    filterValue,
    setFilterValue,
    filterOptions,
  }
}

export default useFilter
