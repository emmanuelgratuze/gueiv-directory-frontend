import React from 'react'
import { NextPage, GetStaticProps } from 'next'
import LegalsScreen from 'screens/Legals'
import { getPageCollectionData } from 'cms/api'

const Criteria: NextPage = () => (
  <LegalsScreen />
)

export const getStaticProps: GetStaticProps = async () => {
  const dataList = [
    { collection: 'configuration', schema: ['configuration'] }
  ]
  const dataPromises = dataList.map((datum) => getPageCollectionData(datum.collection))
  const data = await Promise.all(dataPromises)

  return {
    props: {
      data: dataList.map((datum, index) => ({ ...datum, data: data[index] }))
    }
  }
}

export default Criteria
