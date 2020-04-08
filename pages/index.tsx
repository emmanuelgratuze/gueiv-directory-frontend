import React, { useEffect } from 'react'
import { NextPage, GetStaticProps } from 'next'
import { useDispatch, useSelector } from 'react-redux'

import { BrandColorsKeys } from 'themes/theme'
import { selectBrands } from 'store/data/selectors/brands'
import { setBrandsColors } from 'store/interface/actions'
import useTheme from 'hooks/useTheme'
import { getCollectionData } from 'cms/api'
import fetchFileContent from 'utils/fetchFileContent'
import { Criterion } from 'types/data/criterion'
import HomeScreen from 'screens/Home'

const BrandsPage: NextPage = () => {
  const { theme: { global: { brandColorsNames } } } = useTheme()

  // Immutable to JS
  const brands = useSelector(selectBrands)

  const dispatch = useDispatch()
  useEffect(() => {
    if (brands.size) {
      const brandsColors: { [key: string]: BrandColorsKeys } = {}
      brands.forEach((brand, index) => {
        brandsColors[brand.get('id')] = brandColorsNames[index % brandColorsNames.length]
      })
      dispatch(setBrandsColors(brandsColors))
    }
  }, [brands])

  if (!brands) {
    return null
  }

  return (
    <HomeScreen
      brands={brands}
      brandsColors={brandColorsNames}
    />
  )
}


export const getStaticProps: GetStaticProps = async () => {
  const brands = await getCollectionData('brands')
  const criteria = await getCollectionData('criteria', async (criterion: Criterion) => {
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
      data: [
        { data: brands, type: ['brand'] },
        { data: criteria, type: ['criterion'] },
        { data: configuration, type: ['configuration'] },
        { data: countries, type: ['country'] },
        { data: countries, type: ['productType'] }
      ]
    }
  }
}

export default BrandsPage
