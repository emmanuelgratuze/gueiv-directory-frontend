import React from 'react'
import { NextPage, GetStaticProps } from 'next'
import { normalize } from 'normalizr'
import { List } from 'immutable'
import { useSelector } from 'react-redux'

import Page from '~/components/Page'
import BrandItem from '~/components/BrandPreview/BrandPreview'
import ResponsiveGrid from '~/components/ResponsiveGrid'
import { ThemeColorsType } from '~/themes/theme'
import { fetchBrands } from '~/api/brands'
import * as schemas from '~/store/schemas'
import { selectBrands } from '~/store/entities/brands/selectors'
import { ImmutableBrand } from '~/store/entities/brands/types'
import { AppState } from '~/store/app/types'

const Home: NextPage = () => {
  const homeColors = ['yellow', 'turquoise', 'blue', 'pink']
  const brands = useSelector<AppState, List<ImmutableBrand>>(selectBrands)

  return (
    <>
      <Page title="Home">
        <ResponsiveGrid
          columns={{
            small: ['full'],
            medium: ['50%'],
            xlarge: ['33.33%']
          }}
        >
          {!brands || brands.map((brand, index) => (
            <BrandItem
              key={brand.get('id')}
              brand={brand}
              color={homeColors[index % homeColors.length] as keyof ThemeColorsType}
            />
          ))}
        </ResponsiveGrid>
      </Page>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const data = await fetchBrands()
  const normalizedData = normalize(data, [schemas.brand])
  return {
    props: {
      entities: [
        normalizedData.entities
      ]
    }
  }
}

export default Home
