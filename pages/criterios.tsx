import React from 'react'
import { NextPage, GetStaticProps } from 'next'
import { useSelector } from 'react-redux'
import { getPageCollectionData } from 'cms/api'
import CriteriaScreen from 'screens/Criteria'
import { selectCriteria } from 'store/data/selectors/criteria'

const Criteria: NextPage = () => {
  const criteria = useSelector(selectCriteria)
  return (
    <CriteriaScreen criteria={criteria} />
  )
}

// eslint-disable-next-line
export const getStaticProps: GetStaticProps = async () => {
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
      data: dataList.map((datum, index) => ({ ...datum, data: data[index] }))
    }
  }
}

export default Criteria
