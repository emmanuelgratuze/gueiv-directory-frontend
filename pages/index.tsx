import React from 'react'
import { NextPage, GetStaticProps } from 'next'

import { getPageCollectionData } from 'cms/api'
import HomeScreen from 'screens/Home'

const BrandsPage: NextPage = () => (
  <HomeScreen />
)

// eslint-disable-next-line
export const getStaticProps: GetStaticProps = async () => {
  const dataList = [
    { collection: 'brands', schema: ['brand'] },
    { collection: 'criteria', schema: ['criterion'] },
    { collection: 'genders', schema: ['gender'] },
    { collection: 'configuration', schema: ['configuration'] },
    { collection: 'countries', schema: ['country'] },
    { collection: 'product-types', schema: ['productType'] }
  ]
  const dataPromises = dataList.map((datum) => getPageCollectionData(datum.collection))
  const data = await Promise.all(dataPromises)

  return {
    props: {
      data: dataList.map((datum, index) => ({ ...datum, data: data[index] }))
    }
  }
}

export default BrandsPage
