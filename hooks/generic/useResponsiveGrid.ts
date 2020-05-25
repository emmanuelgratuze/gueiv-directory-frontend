import { useMemo, useCallback } from 'react'
import { sortBy } from 'lodash'

import useTheme from 'hooks/generic/useTheme'
import { BreakpointsValuesType, BreakpointsType, BreakpointsKeysType } from 'themes/theme'
import useResponsive from 'hooks/generic/useResponsive'

type Columns = {
  [key in BreakpointsKeysType]?: (string | number)[];
}

type UseReponsiveGridReturn = {
  getChildrenSizeByIndex: Function;
}

const getSizesForEveryBreakpoints = (breakpoints: BreakpointsType, columns: Columns): { [key in BreakpointsKeysType]?: (string | number)[] } => {
  const allBreakpointsColumns: { [key in BreakpointsKeysType]?: (string | number)[] } = {}
  let lastDefinedColumns: (string | number)[] | undefined
  const breakpointsNames = Object.keys(breakpoints) as BreakpointsKeysType[]
  const breakpointValues: BreakpointsValuesType[] = Object.values(breakpoints)
  const breakpointValuesWithName = breakpointValues.map((col, index) => ({ ...col, name: breakpointsNames[index] }))
  const orderedBreakpointValues = sortBy(
    breakpointValuesWithName,
    [(b) => (
      typeof b.value !== 'undefined' ? b.value : 10 ** 4
    )]
  ).map((col) => col.name) as BreakpointsKeysType[]

  orderedBreakpointValues
    .forEach((columnName, index) => {
      if (typeof columns[columnName] === 'undefined' || columns[columnName] === null) {
        let nextValue = null
        for (let i = index + 1; i < orderedBreakpointValues.length; i += 1) {
          if (columns[orderedBreakpointValues[i]] !== undefined) {
            nextValue = columns[orderedBreakpointValues[i]]
            break
          }
        }
        allBreakpointsColumns[columnName] = nextValue === null ? lastDefinedColumns : nextValue
      } else {
        lastDefinedColumns = columns[columnName]
        allBreakpointsColumns[columnName] = lastDefinedColumns
      }
    })

  return allBreakpointsColumns
}

const useReponsiveGrid = (columns: Columns): UseReponsiveGridReturn => {
  const { size: currentSize } = useResponsive()
  const { theme } = useTheme()

  // Take into consideration if not array is sent but a simple string
  const columnsSizes = useMemo(() => {
    const sizes = getSizesForEveryBreakpoints(theme.global.breakpoints, columns)
    return sizes[currentSize] || []
  }, [columns, currentSize])

  const getChildrenSizeByIndex = useCallback((index: number) => (
    columnsSizes[index % columnsSizes.length] ? columnsSizes[index % columnsSizes.length] : 'full'
  ), [columnsSizes])

  return {
    getChildrenSizeByIndex
  }
}

export default useReponsiveGrid
