import React from 'react'
import { NextPage, GetStaticProps } from 'next'
import { useSelector } from 'react-redux'
import { getCollectionData } from 'cms/api'
import fetchFileContent from 'utils/fetchFileContent'
import { Criterion } from 'types/data/criterion'
import CriteriaScreen from 'screens/Criteria'
import { selectCriteria } from 'store/data/selectors/criteria'

const Criteria: NextPage = () => {
  const criteria = useSelector(selectCriteria)
  return (
    <>
      <CriteriaScreen criteria={criteria} />
    </>
  )
}

// eslint-disable-next-line
export const getStaticProps: GetStaticProps = async () => {
  const criteria = await getCollectionData<Criterion>('criteria', async (criterion) => {
    const newCriterion = criterion
    if (criterion.icon) {
      newCriterion.iconContent = await fetchFileContent(criterion.icon)
    }
    return newCriterion
  })
  const configuration = await getCollectionData('configuration')

  return {
    props: {
      entities: [
        { data: criteria, type: ['criterion'] },
        { data: configuration, type: ['configuration'] }
      ]
    }
  }
}

export default Criteria
