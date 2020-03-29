import React from 'react'
import { NextPage, GetStaticProps, GetStaticPaths } from 'next'
import { normalize } from 'normalizr'
import Link from 'next/link'
import { kebabCase } from 'lodash'
import { Paragraph, Heading } from 'grommet'

import useSelector from '~/hooks/useSelector'
import Page from '~/components/Page'
import { fetchBrands } from '~/api/brands'
import { Brand  } from '~/store/entities/brands/types'
import * as schemas from '~/store/schemas'
import { selectBrandBySlug } from '~/store/entities/brands/selectors'

interface BrandPageType {
  slug: string;
}

const BrandPage: NextPage<BrandPageType> = ({ slug }) => {
  const brand = useSelector((state) => selectBrandBySlug(state)(slug)) as Brand

  return (
    <>
      <Page title="Marca">
        <Link href="/">
          <a>
            Volver
          </a>
        </Link>

        <Heading>{brand.name}</Heading>
        <Paragraph>{brand.description}</Paragraph>
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
