import React, { useEffect } from 'react'
import { Box } from 'grommet'

import Page from 'components/Page'
import Text from 'components/Text'
import FiltersControls from 'components/FiltersControls'

import useFilteredBrands from 'hooks/app/brands/useFilteredBrands'
import useFilters from 'hooks/app/brands/useFilters'
import useBrowser from 'hooks/generic/useBrowser'

import BrandsList from './BrandsList'

type HomeScreenProps = {}

const HomeScreen: React.FC<HomeScreenProps> = () => {
  const { isServerSide } = useBrowser()
  const { brands, selectMore, hasMore } = useFilteredBrands(isServerSide ? 0 : 30)
  const { applyFiltersFromUrl } = useFilters()

  useEffect(() => (
    applyFiltersFromUrl(window.location.href)
  ), [])

  return (
    <>
      <Page
        title="Home"
        withScroll={false}
        withFooter={false}
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
          background={{ color: 'gray' }}
          // pad="0.5rem"
          fill
          // height={brands.size !== 0 ? { min: '100vh' } : undefined}
          // fill={brands.size === 0}
        >
          {/* SEO purpose */}
          <h1 style={{ display: 'none' }}>
            Todas las marcas de moda sostenible de Latinoamérica en un lugar
          </h1>

          <BrandsList
            brands={brands}
            hasMore={hasMore}
            selectMore={selectMore}
          />

          {!isServerSide && brands && brands.size === 0 && (
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
