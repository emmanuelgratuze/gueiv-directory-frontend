import React from 'react'
import { List } from 'immutable'

import Page from 'components/Page'
import BrandPreview from 'components/BrandPreview/BrandPreview'
import ResponsiveGrid from 'components/ResponsiveGrid'
import Text from 'components/Text'

import { ThemeColorsType, BrandColorsKeys } from 'themes/theme'
import { ImmutableBrand } from 'types/data/brand'
import { Box } from 'grommet'
import { AnimatePresence, motion } from 'framer-motion'

type HomeScreenProps = {
  brands: List<ImmutableBrand>;
  brandsColors: BrandColorsKeys[];
}

const HomeScreen: React.FC<HomeScreenProps> = ({
  brands,
  brandsColors
}) => (
  <>
    <Page title="Home" withFilters withScroll={brands.size !== 0}>
      <Box
        height={brands.size !== 0 ? { min: '100vh' } : undefined}
        background={{ color: 'light-turquoise' }}
        fill={brands.size === 0}
      >
        <AnimatePresence exitBeforeEnter>
          <ResponsiveGrid
            columns={{
              small: ['full'],
              medium: ['50%'],
              xlarge: ['33.33%']
            }}
          >
            {!brands || brands.map((brand, index) => (
              <motion.div
                key={brand.get('id')}
                initial={{ opacity: 0, transform: 'scale3d(0.98, 0.98, 1)' }}
                animate={{ opacity: 1, transform: 'scale3d(1, 1, 1)' }}
                exit={{ opacity: 0, transform: 'scale3d(0.98, 0.98, 1)' }}
                transition={{ duration: 0.6 }}
              >
                <BrandPreview
                  key={brand.get('id')}
                  brand={brand}
                  color={brandsColors[index % brandsColors.length] as keyof ThemeColorsType}
                />
              </motion.div>
            ))}
          </ResponsiveGrid>
          <motion.div
            key="no-result"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            style={{ width: '100%', height: '100%' }}
          >
            {brands.size === 0 && (
              <Box
                fill
                align="center"
                justify="center"
                background={{ color: 'light-turquoise' }}
                pad="medium"
              >
                <Text weight="bold" color="gray" textAlign="center">
                  No hemos encontrado marcas por tu criterios :(
                </Text>
              </Box>
            )}
          </motion.div>
        </AnimatePresence>
      </Box>
    </Page>
  </>
)

export default HomeScreen
