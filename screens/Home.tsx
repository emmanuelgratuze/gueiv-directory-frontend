import React, { useEffect } from 'react'
import { NextPage, GetStaticProps } from 'next'
import { useDispatch, useSelector } from 'react-redux'

import Page from 'components/Page'
import BrandPreview from 'components/BrandPreview/BrandPreview'
import ResponsiveGrid from 'components/ResponsiveGrid'
import { ThemeColorsType, BrandColorsKeys } from 'themes/theme'
import { Brand } from 'types/data/brand'

type HomeScreenProps = {
  brands: Brand[];
  brandsColors: BrandColorsKeys[];
}

const HomeScreen: React.FC<HomeScreenProps> = ({
  brands,
  brandsColors
}) => (
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
            color={brandsColors[index % brandsColors.length] as keyof ThemeColorsType}
          />
        ))}
      </ResponsiveGrid>
    </Page>
  </>
)

export default HomeScreen
