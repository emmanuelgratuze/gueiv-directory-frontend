import React, { useEffect } from 'react'
import { NextPage, GetStaticProps } from 'next'
import { useDispatch } from 'react-redux'

import Page from 'components/Page'
import BrandPreview from 'components/BrandPreview/BrandPreview'
import ResponsiveGrid from 'components/ResponsiveGrid'
import { ThemeColorsType, BrandColorsKeys } from 'themes/theme'
import useSelector from 'hooks/useSelector'
// import * as schemas from 'store/schemas'
import { selectBrands } from 'store/data/selectors/brands'
import { Brand } from 'types/data/brand'
import { setBrandsColors } from 'store/interface/actions'
import useTheme from 'hooks/useTheme'
import { getCollectionData, getSingleCollectionData } from 'cms/api'
import fetchFileContent from 'utils/fetchFileContent'
import { Criterion } from 'types/data/criterion'
// import { getCollectionData } from 'cms/api'


const Home: NextPage = () => {
  const { theme: { global: { brandColorsNames } } } = useTheme()
  const brands = useSelector(selectBrands) as Brand[]
  const dispatch = useDispatch()

  useEffect(() => {
    if (brands && brands.length) {
      const brandsColors: { [key: string]: BrandColorsKeys } = {}
      brands.forEach((brand, index) => {
        brandsColors[brand.id] = brandColorsNames[index % brandColorsNames.length]
      })
      dispatch(setBrandsColors(brandsColors))
    }
  }, [brands])

  return (
    <>
      <Page title="Home">
        <ResponsiveGrid
          columns={{
            small: ['full'],
            medium: ['50%'],
            xlarge: ['33.33%']
          }}
        >
          {!brands || brands.map((brand, index) => (
            <BrandPreview
              key={brand.id}
              brand={brand}
              color={brandColorsNames[index % brandColorsNames.length] as keyof ThemeColorsType}
            />
          ))}
        </ResponsiveGrid>
      </Page>
    </>
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
  const configuration = await getSingleCollectionData('configuration')
  const countries = await getCollectionData('countries')

  return {
    props: {
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

export default Home
