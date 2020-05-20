import React, { useEffect } from 'react'
import { Box } from 'grommet'

import Page from 'components/Page'
import Text from 'components/Text'
import FiltersControls from 'components/FiltersControls'

import useFilteredBrands from 'hooks/app/brands/useFilteredBrands'
import useFilters from 'hooks/app/brands/useFilters'

import BrandsList from './BrandsList'

type HomeScreenProps = {}

const HomeScreen: React.FC<HomeScreenProps> = () => {
  const { brands, selectMore, hasMore } = useFilteredBrands(30)
  const { applyFiltersFromUrl } = useFilters()

  useEffect(() => (
    applyFiltersFromUrl(window.location.href)
  ), [])

  return (
    <>
      <Page
        title="Home"
        withScroll={brands.size !== 0}
        headerChildren={(
          <Box fill="vertical" justify="center">
            <FiltersControls />
          </Box>
        )}
        headerOptions={{
          withHomeButton: false
        }}
      >
        <Box
          height={brands.size !== 0 ? { min: '100vh' } : undefined}
          background={{ color: 'gray' }}
          fill={brands.size === 0}
          pad="0.5rem"
        >
          <BrandsList
            brands={brands}
            hasMore={hasMore}
            selectMore={selectMore}
          />

          {brands && brands.size === 0 && (
            <Box
              align="center"
              justify="center"
              pad="medium"
              height="70vh"
            >
              <Text size="large" weight="bold" color="pink" textAlign="center">
                ¡Oops!
                <br />
                <br />
                No hemos encontrado marcas
                <br />
                para los criterios que buscas
              </Text>
            </Box>
          )}
        </Box>
      </Page>
    </>
  )
}

export default HomeScreen
