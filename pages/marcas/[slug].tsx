import React from 'react'
import { NextPage, GetStaticProps, GetStaticPaths } from 'next'
// import { normalize } from 'normalizr'
// import { kebabCase } from 'lodash'
import { Box } from 'grommet'

import Page from 'components/Page'
import Text from 'components/Text'
import Heading from 'components/Heading'
import Button from 'components/Button'
import BrandImageCarousel from 'components/BrandImageCarousel'

import { Brand } from 'store/entities/brands/types'
// import * as schemas from 'store/schemas'
import { selectBrandBySlug } from 'store/entities/brands/selectors'
import useSelector from 'hooks/useSelector'
import useResponsive from 'hooks/useResponsive'
import useBrandColor from 'hooks/useBrandColor'
import Paragraph from 'components/Paragraph'
import CriterionIcon from 'components/CriterionIcon'
import StandardLink from 'components/StandardLink'

interface BrandPageType {
  slug: string;
}

const BrandPage: NextPage<BrandPageType> = ({ slug }) => {
  const brand = useSelector((state) => selectBrandBySlug(state)(slug)) as Brand
  const { isMobile } = useResponsive()
  const [brandColor, oppBrandColor] = useBrandColor(brand)

  if (!brand) {
    return null
  }

  return (
    <>
      <Page
        title="Marca"
        withScroll={isMobile}
        withFooter={false}
      >
        <Box
          background={{ color: brandColor }}
          direction="row-responsive"
          height="100%"
        >
          <BrandImageCarousel
            fill="vertical"
            width="50%"
            brand={brand}
          />
          <Box
            width="50%"
            pad={isMobile ? 'large' : 'xlarge'}
            flex={{ grow: 1 }}
          >
            <Heading
              level={1}
              transform="uppercase"
            >
              {brand.name}
            </Heading>

            {/* Location */}
            {brand.city !== '' && brand.country && (
              <Heading
                level={2}
                size="small"
                color={oppBrandColor}
              >
                {brand.city && `${brand.city}, `}
                {brand.country?.name}
              </Heading>
            )}

            {/* Description */}
            <Paragraph
              size="large"
              font="Lato"
              color={oppBrandColor}
              margin={{ bottom: 'medium' }}
            >
              {brand.description}
            </Paragraph>

            {/* Criteria */}
            <Box margin={{ bottom: '2.2rem' }}>
              <Text
                transform="uppercase"
                color={oppBrandColor}
                weight="bold"
                margin={{ bottom: 'small' }}
              >
                Criterios
              </Text>
              {brand.criteria && (
                <Box direction="row" gap="small">
                  {brand.criteria.map((criterion) => (
                    <Box
                      key={criterion.id}
                      width="2.2rem"
                      height="2.2rem"
                    >
                      <CriterionIcon
                        criterion={criterion}
                        color={oppBrandColor}
                      />
                    </Box>
                  ))}
                </Box>
              )}
            </Box>

            {/* Links */}
            <Box direction="row" gap="small">
              {[
                ['Instagram', brand.instagram],
                ['Facebook', brand.facebook],
                ['Página web', brand.web]
              ].map(([label, link]) => link && (
                <StandardLink href={link} external>
                  <Button size="small">
                    {label}
                  </Button>
                </StandardLink>
              ))}
            </Box>
          </Box>
        </Box>
      </Page>
    </>
  )
}

// eslint-disable-next-line
export const getStaticProps: GetStaticProps = async ({ params }) => {
  // const data = await fetchBrands()
  // const normalizedData = normalize(data, [schemas.brand])

  return {
    props: {
      slug: params?.slug,
      color: params?.color || null,
      entities: [
        // normalizedData.entities
      ]
    }
  }
}

// eslint-disable-next-line
export const getStaticPaths: GetStaticPaths = async () => {
  // const brands: Brand[] = await fetchBrands()

  return {
    paths: [],
    // paths: brands.map((brand) => ({
    //   params: { slug: kebabCase(brand.name) }
    // })),
    fallback: false
  }
}

export default BrandPage
