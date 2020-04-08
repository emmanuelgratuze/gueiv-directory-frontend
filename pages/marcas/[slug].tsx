import React from 'react'
import { NextPage, GetStaticProps, GetStaticPaths } from 'next'
import { useSelector } from 'react-redux'
import BrandScreen from 'screens/Brand'
import { selectBrandBySlug } from 'store/data/selectors/brands'
import { Brand } from 'types/data/brand'
import { getCollectionData, getPageCollectionData } from 'cms/api'

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

// eslint-disable-next-line
export const getStaticProps: GetStaticProps = async ({ params }) => {
  const dataList = [
    { collection: 'brands', schema: ['brand'] },
    { collection: 'criteria', schema: ['criterion'] },
    { collection: 'configuration', schema: ['configuration'] },
    { collection: 'countries', schema: ['country'] },
    { collection: 'product-types', schema: ['productType'] }
  ]
  const dataPromises = dataList.map((datum) => getPageCollectionData(datum.collection))
  const data = await Promise.all(dataPromises)

  return {
    props: {
      slug: params?.slug,
      color: params?.color || null,
      data: dataList.map((datum, index) => ({ ...datum, data: data[index] }))
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
