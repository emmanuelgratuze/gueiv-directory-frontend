import React from 'react'
import { NextPage, GetStaticProps, GetStaticPaths } from 'next'
import { useSelector } from 'react-redux'
import BrandScreen from 'screens/Brand'
import { selectBrandBySlug } from 'store/data/selectors/brands'
import { Brand } from 'types/data/brand'
import { Criterion } from 'types/data/criterion'
import fetchFileContent from 'utils/fetchFileContent'
import { getCollectionData } from 'cms/api'

interface BrandPageType {
  slug: string;
}

const BrandPage: NextPage<BrandPageType> = ({ slug }) => {
  const brand = useSelector((state) => selectBrandBySlug(state)(slug))

  if (!brand) {
    return null
  }

  return (
    <BrandScreen brand={brand} />
  )
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const brands = await getCollectionData('brands')
  const criteria = await getCollectionData<Criterion>('criteria', async (criterion) => {
    const newCriterion = criterion
    if (criterion.icon) {
      newCriterion.iconContent = await fetchFileContent(criterion.icon)
    }
    return newCriterion
  })
  const configuration = await getCollectionData('configuration')
  const countries = await getCollectionData('countries')

  return {
    props: {
      slug: params?.slug,
      color: params?.color || null,
      data: [
        { data: brands, type: ['brand'] },
        { data: criteria, type: ['criterion'] },
        { data: configuration, type: 'configuration' },
        { data: countries, type: ['country'] },
        { data: countries, type: ['productType'] }
      ]
    }
  }
}

// eslint-disable-next-line
export const getStaticPaths: GetStaticPaths = async () => {
  const brands = await getCollectionData<Brand>('brands')

  return {
    paths: brands.map((brand) => ({
      params: { slug: brand.slug }
    })),
    fallback: false
  }
}

export default BrandPage
