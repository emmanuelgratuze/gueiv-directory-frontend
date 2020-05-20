import React, { useCallback } from 'react'
import {
  Box,
  BoxProps,
  Layer,
  Button
} from 'grommet'
import styled, { css } from 'styled-components'

import Text from 'components/Text'
import Container from 'components/Container'
import ResponsiveGrid from 'components/ResponsiveGrid'
import CustomButton from 'components/Button'
import useTheme from 'hooks/generic/useTheme'
import useFilter from 'hooks/app/brands/useFilter'
import { StatusGoodSmall, FormClose } from 'grommet-icons'

import useResponsive from 'hooks/generic/useResponsive'
import useFilterMenu from 'hooks/app/brands/useFilterMenu'
import useBodyScroll from 'hooks/generic/useBodyScroll'

import FiltersControlsFields from 'components/FiltersControls/Fields'
import { ThemeType } from 'themes/theme'
import { darken } from 'polished'

type ButtonsBoxProps = {
  isMobile?: boolean;
  theme: ThemeType;
}
const ButtonsBox = styled(Box)<ButtonsBoxProps>`
  ${(props: ButtonsBoxProps) => props.isMobile && css`
    position: fixed;
    bottom: 0;
    left: 0;
    background-color: ${props.theme.global.colors.gray};
  `}
`

type FiltersMenuProps = {}

const FiltersMenu: React.FC<BoxProps & FiltersMenuProps> = () => {
  const { isMobile } = useResponsive()
  const { colors } = useTheme()

  const { state: menuState, close } = useFilterMenu()

  // Filter stuff
  const {
    filterValue,
    filterOptions,
    addFilter,
    removeFilters
  } = useFilter(menuState.get('filterId'))
  const { y: scrollY } = useBodyScroll()

  const handleOptionClick = useCallback((optionId: string): void => {
    let currentValue = filterValue
    if (filterValue.includes(optionId)) {
      const index = filterValue.indexOf(optionId)
      currentValue = currentValue.splice(index, 1)
    } else {
      currentValue = currentValue.push(optionId)
    }
    addFilter(currentValue)
  }, [addFilter, filterValue])

  // UI stuff
  const { theme } = useTheme()
  const getTextColor = useCallback((option, hover: boolean) => {
    const colorsConfig = {
      normal: ['light-2', 'white'],
      selected: ['yellow', 'light-yellow']
    }
    return colorsConfig[filterValue.includes(option.value) ? 'selected' : 'normal'][hover ? 1 : 0]
  }, [filterValue])

  const backgroundColor = scrollY < 10 ? 'gray' : 'dark-gray'

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
            background={{ color: backgroundColor }}
            pad={{ top: theme.header.height }}
            fill
            overflow="auto"
          >
            {isMobile && (
              <Box
                fill="horizontal"
                overflow={{ horizontal: 'auto' }}
                background={{ color: 'gray' }}
                flex={{ shrink: 0 }}
                align="center"
              >
                <FiltersControlsFields />
              </Box>
            )}
            <Container
              pad={isMobile ? { top: 'small', bottom: '10rem', horizontal: 'medium' } : 'medium'}
              flex={isMobile ? false : undefined}
              // overflow={isMobile ? 'scroll' : undefined}
              direction={isMobile ? 'column-reverse' : 'column'}
              background={{
                color: isMobile ? darken(0.1, colors.gray) : backgroundColor
              }}
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
                        {!isMobile && (
                          <StatusGoodSmall
                            size="small"
                            color={filterValue.includes(option.value) ? getTextColor(option, hover) : 'transparent'}
                          />
                        )}
                        <Text
                          weight={isMobile && filterValue.includes(option.value) || !isMobile ? 'bold' : undefined}
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
              <ButtonsBox
                margin={{ top: 'medium' }}
                fill="horizontal"
                align="center"
                justify="center"
                direction="row"
                gap="medium"
                pad={{ vertical: 'xsmall' }}
                isMobile={isMobile}
              >
                <CustomButton color="yellow" onClick={() => close()}>
                  Ver marcas
                </CustomButton>
                <Button plain onClick={() => removeFilters()} disabled={filterValue.size === 0}>
                  {({ hover }: { hover: boolean }) => (
                    <Box align="center" direction="row" justify="center">
                      <FormClose color={hover && filterValue.size > 0 ? 'pink' : 'white'} />
                      <Text
                        size="xsmall"
                        transform="uppercase"
                        color={hover && filterValue.size > 0 ? 'pink' : 'white'}
                        weight="bold"
                        font="Quicksand"
                      >
                        Borrar filtros
                      </Text>
                    </Box>
                  )}
                </Button>
              </ButtonsBox>
            </Container>
          </Box>
        </Layer>
      )}
    </>
  )
}

export default FiltersMenu
