import React, { useCallback } from 'react'
import {
  Box,
  BoxProps,
  Layer,
  Button
} from 'grommet'
import { useSelector, useDispatch } from 'react-redux'

import Text from 'components/Text'
import Container from 'components/Container'
import ResponsiveGrid from 'components/ResponsiveGrid'
import useTheme from 'hooks/useTheme'
import useFilter from 'hooks/useFilter'

import { selectFiltersMenuState } from 'store/interface/filters/selectors'
import { closeFilterMenu } from 'store/interface/filters/actions'

import { StatusGoodSmall } from 'grommet-icons'
import useResponsive from 'hooks/useResponsive'
import FiltersControls from 'components/FiltersControls'

type FiltersMenuProps = {}

const FiltersMenu: React.FC<BoxProps & FiltersMenuProps> = () => {
  // Menu state stuff
  const dispatch = useDispatch()
  const menuState = useSelector(selectFiltersMenuState)
  const { isMobile } = useResponsive()
  const handleClose = useCallback(() => {
    dispatch(closeFilterMenu())
  }, [])

  // Filter stuff
  const { filterValue, filterOptions, setFilterValue } = useFilter(menuState.get('filterId'))
  const handleOptionClick = useCallback((optionId: string): void => {
    let currentValue = filterValue
    if (filterValue.includes(optionId)) {
      const index = filterValue.indexOf(optionId)
      currentValue = currentValue.splice(index, 1)
    } else {
      currentValue = currentValue.push(optionId)
    }
    setFilterValue(currentValue)
  }, [setFilterValue, filterValue])

  // UI stuff
  const { theme } = useTheme()
  const getTextColor = useCallback((option, hover: boolean) => {
    const colors = {
      normal: ['light-2', 'white'],
      selected: ['yellow', 'light-yellow']
    }
    return colors[filterValue.includes(option.value) ? 'selected' : 'normal'][hover ? 1 : 0]
  }, [filterValue])

  return (
    <>
      {menuState.get('isOpen') && (
        <Layer
          position="top"
          full="horizontal"
          plain
          onClickOutside={handleClose}
          onEsc={handleClose}
        >
          <Box
            background={{ color: 'gray' }}
            pad={{ top: theme.header.height }}
            fill
            overflow={isMobile ? 'scroll' : undefined}
          >
            {isMobile && (
              <Box
                fill="horizontal"
                overflow="scroll"
                background={{ color: 'light-2' }}
                flex={{ shrink: 0 }}
              >
                <FiltersControls />
              </Box>
            )}
            <Container
              pad={isMobile ? { top: 'large', bottom: 'xlarge', horizontal: 'medium' } : 'medium'}
              flex={isMobile ? false : undefined}
              overflow={isMobile ? 'scroll' : undefined}
            >
              <ResponsiveGrid
                columns={{
                  small: ['full'],
                  medium: ['50%'],
                  xlarge: ['25%']
                }}
              >
                {filterOptions.map((option) => (
                  <Button
                    key={option.value}
                    plain
                    fill
                    onClick={() => handleOptionClick(option.value)}
                  >
                    {({ hover }: { hover: boolean }) => (
                      <Box
                        justify="center"
                        align="center"
                        pad={isMobile ? 'small' : 'medium'}
                        direction="row"
                        gap="small"
                      >
                        <StatusGoodSmall
                          size="small"
                          color={filterValue.includes(option.value) ? getTextColor(option, hover) : 'transparent'}
                        />
                        <Text
                          weight="bold"
                          color={getTextColor(option, hover)}
                          textAlign="center"
                        >
                          {option.label}
                        </Text>
                      </Box>
                    )}
                  </Button>
                ))}
              </ResponsiveGrid>
            </Container>
          </Box>
        </Layer>
      )}
    </>
  )
}

export default FiltersMenu
