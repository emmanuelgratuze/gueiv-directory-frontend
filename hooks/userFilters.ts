import { useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { selectCurrentFilters } from 'store/interface/filters/selectors'
import { applyFilters } from 'store/interface/filters/actions'
import convertObjectToStringParameters from 'utils/url/convertObjectInStringParameters'
import getParametersFromUrl from 'utils/url/getParametersFromUrl'

type ReturnedValue = {
  applyFiltersFromUrl: Function;
  getFiltersUrlString: Function;
}

const useFilters = (): ReturnedValue => {
  const dispatch = useDispatch()
  const currentFiltersValues = useSelector(selectCurrentFilters)
  const previousFilterValues = useRef(currentFiltersValues)

  const getFiltersUrlString = (): string => {
    const parameters = convertObjectToStringParameters(currentFiltersValues.toJS())
    return parameters.length ? `?${parameters}` : '?'
  }

  useEffect(() => {
    if (currentFiltersValues !== previousFilterValues.current) {
      window.history.pushState(null, document.title, getFiltersUrlString())
    }
  }, [currentFiltersValues])

  const applyFiltersFromUrl = (url: string): void => {
    const parameters = getParametersFromUrl(url)
    const parsedParameters: { [key: string]: unknown } = {}
    Object.keys(parameters).forEach((key: string) => {
      if (parameters[key].includes(',')) {
        parsedParameters[key] = parameters[key].split(',')
      } else {
        parsedParameters[key] = parameters[key]
      }
      dispatch(applyFilters(parsedParameters))
    })
  }

  return {
    applyFiltersFromUrl,
    getFiltersUrlString
  }
}

export default useFilters
