import React from 'react'
import { NextPage, GetStaticProps } from 'next'
import Page from '~/components/Page'

import store from '~/store/index'
import { Brand } from '~/store/entities/brands/types'
import { fetchBrands } from '~/store/entities/brands/actions'
import { selectBrands } from '~/store/entities/brands/selectors'
import BrandItem from '~/components/BrandItem'
import ResponsiveGrid from '~/components/ResponsiveGrid'


interface HomePage {
  brands: Brand[];
}

const Home: NextPage<HomePage> = ({ brands }) => (
  <>
    <Page title="Home">
      <ResponsiveGrid
        columns={{
          small: ['full'],
          medium: ['50%'],
          xlarge: ['33.33%']
        }}
      >
        {brands.map((brand) => (
          <BrandItem key={brand.id} brand={brand} />
        ))}
      </ResponsiveGrid>
    </Page>
  </>
)

export const getStaticProps: GetStaticProps = async () => {
  await store.dispatch(fetchBrands())
  const brands = selectBrands(store.getState())

  return {
    props: {
      brands: brands.toJS()
    }
  }
}

export default Home
