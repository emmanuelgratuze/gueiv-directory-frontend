import {
  useState,
  useCallback,
  useMemo,
  useEffect,
  useRef
} from 'react'
import { useSelector } from 'react-redux'
import { List, Record } from 'immutable'

import { selectFilteredBrands, selectCurrentFilters } from 'store/interface/filters/selectors'
import { ImmutableBrand } from 'types/data/brand'

type ReturnedValue = {
  brands: List<ImmutableBrand>;
  selectMore: Function;
  currentFilters: Record<{ [key: string]: List<string> }>;
  limit: number;
  totalLength: number;
  hasMore: boolean;
}

const useFilteredBrands = (limit = 10): ReturnedValue => {
  const [, triggerUpdate] = useState(0)
  const newFilters = useSelector(selectCurrentFilters)
  const filters = useRef<Record<{ [key: string]: List<string> }>>()
  const pagination = useRef<number>(0)
  const brandsChunks = useRef<List<ImmutableBrand>[]>([])
  const currentPagination = filters.current !== newFilters ? 0 : pagination.current

  // Get brands
  const { totalLength, hasMore, brands: newBrands } = useSelector(
    (state) => selectFilteredBrands(state)(newFilters, currentPagination * limit, limit)
  )

  // Get list of brands based on chunks
  const brands = useMemo(() => {
    if (filters.current !== newFilters) {
      brandsChunks.current = []
    }
    brandsChunks.current[currentPagination] = newBrands
    return brandsChunks.current.reduce((concatedChunks, chunk) => (
      concatedChunks.concat(chunk)
    ), List([]))
  }, [newBrands])

  useEffect(() => {
    filters.current = newFilters
  }, [newFilters])

  const selectMore = useCallback(() => {
    pagination.current = currentPagination + 1
    triggerUpdate(Date.now())
  }, [currentPagination, pagination, triggerUpdate])

  return {
    currentFilters: newFilters,
    totalLength,
    brands,
    selectMore,
    limit,
    hasMore
  }
}

export default useFilteredBrands
