import React, { useEffect } from 'react'
import { NextPage, GetStaticProps } from 'next'
import { normalize } from 'normalizr'
import { useDispatch } from 'react-redux'
import fs from 'fs'

import Page from '~/components/Page'
import BrandPreview from '~/components/BrandPreview/BrandPreview'
import ResponsiveGrid from '~/components/ResponsiveGrid'
import { ThemeColorsType, BrandColorsKeys } from '~/themes/theme'
import useSelector from '~/hooks/useSelector'
import { setBrandsColors } from '~/store/interface/actions'
import useTheme from '~/hooks/useTheme'


const Home: NextPage = () => {
  return (
    <>
    </>
  )
}


// (entities:  ) => {
//   const newEntities = entities
//   Object.keys(brands).forEach((key) => {
//     newEntities[key].slug = kebabCase(entities[key].name)
//   })
//   return newEntities
// )
// )

// eslint-disable-next-line
export const getStaticProps: GetStaticProps = async () => {
  const data = fs.readdirSync(`${process.env.PWD}/contents/brands`).map((brand) => {
    return brand
  })
  // const normalizedData = normalize(data, [schemas.brand])
  return {
    props: {
      entities: [
        // normalizedData.entities
      ]
    }
  }
}

export default Home
