import React, { useCallback } from 'react'
import { Box, BoxProps } from 'grommet'
import { useDispatch, useSelector } from 'react-redux'

import { openFilterMenu, closeFilterMenu } from 'store/interface/filters/actions'
import { selectFiltersMenuState, selectCurrentFilters, selectAvailableFilters } from 'store/interface/filters/selectors'

import FilterSelect from './Select'

const FiltersControlsFields: React.FC<BoxProps> = ({ ...props }) => {
  const menuState = useSelector(selectFiltersMenuState)
  const currentFiltersValues = useSelector(selectCurrentFilters)
  const availableFilters = useSelector(selectAvailableFilters)
  const dispatch = useDispatch()

  const handleClickOnSelect = useCallback((filterId) => {
    const action = menuState.get('filterId') === filterId
      ? closeFilterMenu()
      : openFilterMenu(filterId)

    dispatch(action)
  }, [menuState])

  return (
    <Box
      direction="row"
      {...props}
    >
      {availableFilters.map((filter) => (
        <FilterSelect
          key={`${filter.get('id')}`}
          isOpen={menuState.get('filterId') === filter.get('id')}
          selectedFilters={currentFiltersValues.get(filter.get('id'))}
          onClick={() => handleClickOnSelect(filter.get('id'))}
        >
          {filter.get('label')}
        </FilterSelect>
      ))}
    </Box>
  )
}

export default FiltersControlsFields
