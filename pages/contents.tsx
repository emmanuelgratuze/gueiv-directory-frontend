import React, { useEffect } from 'react'
import { NextPage, GetStaticProps } from 'next'
import { normalize } from 'normalizr'
import { useDispatch } from 'react-redux'
import fs from 'fs'

import Page from 'components/Page'
import BrandPreview from 'components/BrandPreview/BrandPreview'
import ResponsiveGrid from 'components/ResponsiveGrid'
import { ThemeColorsType, BrandColorsKeys } from 'themes/theme'
import useSelector from 'hooks/useSelector'
import { setBrandsColors } from 'store/interface/actions'
import { Data } from 'store/data/types.d'
import useTheme from 'hooks/useTheme'
import * as schemas from 'store/data/schemas'
import { getCollectionData } from 'cms/api'
import { Brand } from 'types/data/brand'

const Home: NextPage = () => {
  return (
    <>
    </>
  )
}

// eslint-disable-next-line
export const getStaticProps: GetStaticProps = async () => {
  const brands = await getCollectionData('brands')
  const criteria = await getCollectionData('criteria')
  const configuration = await getCollectionData('configuration')

  return {
    props: {
      data: [
        { data: brands, type: ['brand'] },
        { data: criteria, type: ['criterion'] },
        { data: configuration, type: 'configuration' }
      ]
    }
  }
}

export default Home
