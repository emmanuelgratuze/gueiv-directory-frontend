import {
  useCallback,
  useMemo,
  useEffect,
  useRef
} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { List } from 'immutable'
import { selectFilterOptions, FilterOption, selectCurrentFilters } from 'store/interface/filters/selectors'
import { applyFilter, applyFilters, removeFilter } from 'store/interface/filters/actions'
import convertObjectToStringParameters from 'utils/url/convertObjectInStringParameters'
import getParametersFromUrl from 'utils/url/getParametersFromUrl'

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
  const previousFilterValues = useRef(currentFiltersValues)
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

  useEffect(() => {
    if (currentFiltersValues !== previousFilterValues.current) {
      const parameters = convertObjectToStringParameters(currentFiltersValues.toJS())
      window.history.pushState(null, document.title, parameters.length ? `?${parameters}` : '?')
    }
  }, [currentFiltersValues])

  useEffect(() => {
    const parameters = getParametersFromUrl(window.location.href)
    const parsedParameters: { [key: string]: unknown } = {}
    Object.keys(parameters).forEach((key: string) => {
      if (parameters[key].includes(',')) {
        parsedParameters[key] = parameters[key].split(',')
      } else {
        parsedParameters[key] = parameters[key]
      }
      dispatch(applyFilters(parsedParameters))
    })
  }, [])

  return {
    filterId,
    filterValue,
    addFilter,
    removeFilters,
    filterOptions,
  }
}

export default useFilter
