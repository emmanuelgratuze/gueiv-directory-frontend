import React from 'react'
import { Box, BoxProps, Button } from 'grommet'
import { Filter, Sort } from 'grommet-icons'

import useFilterMenu from 'hooks/useFilterMenu'
import useResponsive from 'hooks/useResponsive'

import FiltersControlsFields from './Fields'

const FiltersControls: React.FC<BoxProps> = () => {
  const { isOpen: areFiltersOpen, toggle: toggleFilters } = useFilterMenu()
  const { isMobile } = useResponsive()

  return isMobile
    ? (
      <Button
        plain
        onClick={() => toggleFilters(!areFiltersOpen ? 'criteria' : null)}
      >
        <Box
          fill="vertical"
          width="3rem"
          align="center"
          justify="center"
        >
          {!areFiltersOpen ? (
            <Filter color="gray" />
          ) : (
            <Sort color="blue" />
          )}
        </Box>
      </Button>
    ) : (
      <FiltersControlsFields />
    )
}

export default FiltersControls
