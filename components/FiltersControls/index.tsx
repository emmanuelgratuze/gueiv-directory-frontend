import React from 'react'
import { Box, BoxProps, Button } from 'grommet'
import { FormFilter, FormUp } from 'grommet-icons'

import useFilterMenu from 'hooks/app/brands/useFilterMenu'
import useResponsive from 'hooks/generic/useResponsive'

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
            <FormFilter color="white" />
          ) : (
            <FormUp color="yellow" />
          )}
        </Box>
      </Button>
    ) : (
      <FiltersControlsFields />
    )
}

export default FiltersControls
