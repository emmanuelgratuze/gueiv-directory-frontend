import React, { Children, useMemo, memo } from 'react'
import { sortBy } from 'lodash'
import { Box, BoxTypes } from 'grommet'
import useTheme from '~/hooks/useTheme'
import { BreakpointsValuesType, BreakpointsType, BreakpointsKeysType } from '~/themes/theme.d'
import useResponsive from '~/hooks/useResponsive'

interface ResponsiveGrid {
  columns: { [key in BreakpointsKeysType]?: string[] };
  childrenProps?: { [key: string]: unknown };
  alignItems?: string;
}

const getSizesForEveryBreakpoints = (breakpoints: BreakpointsType, columns: ResponsiveGrid['columns']): { [key in BreakpointsKeysType]?: string[] } => {
  const allBreakpointsColumns: { [key in BreakpointsKeysType]?: string[] } = {}
  let lastDefinedColumns: string[] | undefined
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

const ResponsiveGrid: React.FC<BoxTypes & ResponsiveGrid> = ({
  children,
  columns,
  childrenProps,
  alignItems,
  ...props
}) => {
  const { size: currentSize } = useResponsive()
  const theme = useTheme()

  // Take into consideration if not array is sent but a simple string
  const columnsSizes = useMemo(() => {
    const sizes = getSizesForEveryBreakpoints(theme.global.breakpoints, columns)
    return sizes[currentSize] || []
  }, [columns, currentSize])

  const childrenLength = Array.isArray(children) ? children.length : 1

  return (
    <Box width="100%" {...props} direction="row" wrap>
      {Children.map(children, (child, index) => (
        <Box
          // eslint-disable-next-line react/no-array-index-key
          key={index}
          width={columnsSizes[index % columnsSizes.length] ? columnsSizes[index % columnsSizes.length] : 'full'}
          {...childrenProps}
        >
          {child}
        </Box>
      ))}

      {alignItems === 'left' && (
        <>
          {Array.apply(0, Array(childrenLength % columnsSizes.length)).map((element, index) => {
            const baseIndex = childrenLength - (childrenLength % columnsSizes.length)
            const fakeIndex = baseIndex + index
            return (
              <Box
                key={fakeIndex}
                width={columnsSizes[fakeIndex % columnsSizes.length] ? columnsSizes[fakeIndex % columnsSizes.length] : 'full'}
              />
            )
          })}
        </>
      )}
    </Box>
  )
}

export default memo(ResponsiveGrid)
