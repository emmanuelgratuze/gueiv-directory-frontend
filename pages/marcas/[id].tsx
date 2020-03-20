import React from 'react'
import { NextPage, GetStaticProps, GetStaticPaths } from 'next'
import Link from 'next/link'
import Page from '~/components/Page'

// Redux
import { fetchBrands } from '~/store/entities/brands/actions'
import { selectBrands } from '~/store/entities/brands/selectors'

import store from '~/store/index'

const Brand: NextPage = () => (
  <>
    <Page title="Marca">
      Index page
      <Link href="/">
        <a>
          Index
        </a>
      </Link>
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

export const getStaticPaths: GetStaticPaths = async () => {
  await store.dispatch(fetchBrands())
  const brands = selectBrands(store.getState())

  return {
    paths: brands.toJS().map(brand => ({
      params: { id: brand.slug }
    })),
    fallback: false
  }
}

export default Brand
