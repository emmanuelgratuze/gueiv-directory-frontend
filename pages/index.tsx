import React, { useEffect } from 'react'
import { NextPage, GetStaticProps } from 'next'
import { useDispatch, useSelector } from 'react-redux'

import { BrandColorsKeys } from 'themes/theme'
import { selectBrands } from 'store/data/selectors/brands'
import { setBrandsColors } from 'store/interface/actions'
import useTheme from 'hooks/useTheme'
import { getPageCollectionData } from 'cms/api'
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
