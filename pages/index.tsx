import React from 'react'
import { NextPage, GetStaticProps } from 'next'

import Page from '~/components/Page'
import BrandItem from '~/components/BrandPreview'
import ResponsiveGrid from '~/components/ResponsiveGrid'
import store from '~/store/index'
import { Brand } from '~/store/entities/brands/types'
import { fetchBrands } from '~/store/entities/brands/actions'
import { selectBrands } from '~/store/entities/brands/selectors'
import { ThemeColorsType } from '~/themes/theme'


interface HomePage {
  brands: Brand[];
}

const Home: NextPage<HomePage> = ({ brands }) => {
  const homeColors = ['yellow', 'turquoise', 'blue', 'pink']
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
          {brands.map((brand, index) => (
            <BrandItem
              key={brand.id}
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
  await store.dispatch(fetchBrands())
  const brands = selectBrands(store.getState())

  return {
    props: {
      brands: JSON.parse(JSON.stringify(brands.toJS()))
    }
  }
}

export default Home
