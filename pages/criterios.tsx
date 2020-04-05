import React, { useEffect } from 'react'
import { NextPage, GetStaticProps } from 'next'
// import { normalize } from 'normalizr'
import { useDispatch } from 'react-redux'
import { Box } from 'grommet'

import Page from 'components/Page'
import { BrandColorsKeys } from 'themes/theme'
import useSelector from 'hooks/useSelector'
// import * as schemas from 'store/schemas'
import { selectBrands } from 'store/data/selectors/brands'
import { Brand } from 'types/data/brand'
import { setBrandsColors } from 'store/interface/actions'
import useTheme from 'hooks/useTheme'

const Criteria: NextPage = () => {
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
      <Page title="Nuestros criterios">
        <Box height="medium" />
      </Page>
    </>
  )
}

// eslint-disable-next-line
export const getStaticProps: GetStaticProps = async () => {
  // const data = await fetchBrands()
  // const normalizedData = normalize(data, [schemas.brand])
  return {
    props: {
      entities: [
        // normalizedData.entities
      ]
    }
  }
}

export default Criteria
