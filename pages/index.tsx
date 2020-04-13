import React, { useEffect } from 'react'
import { NextPage, GetStaticProps } from 'next'
import { useDispatch, useSelector } from 'react-redux'

import { BrandColorsKeys } from 'themes/theme'
import { selectFilteredBrands } from 'store/interface/filters/selectors'
import { setBrandsColors } from 'store/interface/actions'
import useTheme from 'hooks/useTheme'
import { getPageCollectionData } from 'cms/api'
import HomeScreen from 'screens/Home'

const BrandsPage: NextPage = () => {
  const { theme: { global: { brandColorsNames } } } = useTheme()

  // Immutable to JS
  const filteredBrands = useSelector(selectFilteredBrands)

  const dispatch = useDispatch()
  useEffect(() => {
    if (filteredBrands.size) {
      const brandsColors: { [key: string]: BrandColorsKeys } = {}
      filteredBrands.forEach((brand, index) => {
        brandsColors[brand.get('id')] = brandColorsNames[index % brandColorsNames.length]
      })
      dispatch(setBrandsColors(brandsColors))
    }
  }, [filteredBrands])

  if (!filteredBrands) {
    return null
  }

  return (
    <HomeScreen
      brands={filteredBrands}
      brandsColors={brandColorsNames}
    />
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

export default BrandsPage
