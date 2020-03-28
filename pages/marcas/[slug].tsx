import React from 'react'
import { NextPage, GetStaticProps, GetStaticPaths } from 'next'
import { normalize } from 'normalizr'
import Link from 'next/link'
import { kebabCase } from 'lodash'
import { useSelector } from 'react-redux'
import { Paragraph, Heading } from 'grommet'

import Page from '~/components/Page'
import { fetchBrands } from '~/api/brands'
import { Brand, ImmutableBrand } from '~/store/entities/brands/types'
import * as schemas from '~/store/schemas'
import { selectBrandBySlug } from '~/store/entities/brands/selectors'
import { ImmutableAppState } from '~/store/app/types'

interface BrandPageType {
  slug: 'string';
}

const BrandPage: NextPage<BrandPageType> = ({ slug }) => {
  const brand = useSelector<ImmutableAppState, ImmutableBrand>((state) => selectBrandBySlug(state)(slug))

  return (
    <>
      <Page title="Marca">
        <Link href="/">
          <a>
            Volver
          </a>
        </Link>

        <Heading>{brand?.get('name')}</Heading>
        <Paragraph>{brand?.get('description')}</Paragraph>
      </Page>
    </>
  )
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const data = await fetchBrands()
  const normalizedData = normalize(data, [schemas.brand])

  return {
    props: {
      slug: params?.slug,
      entities: [
        normalizedData.entities
      ]
    }
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const brands: Brand[] = await fetchBrands()
  return {
    paths: brands.map((brand) => ({
      params: { slug: kebabCase(brand.name) }
    })),
    fallback: false
  }
}

export default BrandPage
