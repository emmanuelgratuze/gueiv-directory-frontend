import React, { useCallback } from 'react'
import {
  Box,
  BoxProps,
  Layer,
  Button
} from 'grommet'

import Text from 'components/Text'
import Container from 'components/Container'
import ResponsiveGrid from 'components/ResponsiveGrid'
import CustomButton from 'components/Button'
import useTheme from 'hooks/useTheme'
import useFilter from 'hooks/useFilter'
import { StatusGoodSmall } from 'grommet-icons'

import useResponsive from 'hooks/useResponsive'
import useFilterMenu from 'hooks/useFilterMenu'

import FiltersControls from 'components/FiltersControls'

type FiltersMenuProps = {}

const FiltersMenu: React.FC<BoxProps & FiltersMenuProps> = () => {
  const { isMobile } = useResponsive()

  const { state: menuState, close } = useFilterMenu()

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
          onClickOutside={() => close()}
          onEsc={() => close()}
        >
          <Box
            background={{ color: 'gray' }}
            pad={{ top: theme.header.height }}
            fill
            overflow="auto"
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
              pad={isMobile ? { top: 'large', bottom: 'xlarge', horizontal: 'medium' } : 'large'}
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
              <Box fill="horizontal" align="center" onClick={() => close()}>
                <CustomButton color="yellow">
                  Ver las marcas
                </CustomButton>
              </Box>
            </Container>
          </Box>
        </Layer>
      )}
    </>
  )
}

export default FiltersMenu
