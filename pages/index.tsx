import React from 'react'
import { NextPage, GetStaticProps } from 'next'
import Link from 'next/link'
import Page from '~/components/Page'

import store from '~/store/index'
import { ImmutableBrand } from '~/store/entities/brands/types'
import { fetchBrands } from '~/store/entities/brands/actions'
import { selectBrands } from '~/store/entities/brands/selectors'


interface HomePage {
  brands: ImmutableBrand[];
}

const Home: NextPage<HomePage> = ({ brands }) => {
  // console.log(brands)
  return (
    <>
      <Page title="Home">
        Index page
        <Link href="/brands">
          <a>
            Yeah
          </a>
        </Link>
      </Page>
    </>
  )
}

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
