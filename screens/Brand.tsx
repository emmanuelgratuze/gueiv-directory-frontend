import React from 'react'
import { Box } from 'grommet'

import Page from 'components/Page'
import Text from 'components/Text'
import Heading from 'components/Heading'
import Button from 'components/Button'
import BrandCarousel from 'components/BrandCarousel'
import useResponsive from 'hooks/useResponsive'
import useBrandColor from 'hooks/useBrandColor'
import Paragraph from 'components/Paragraph'
import CriterionIcon from 'components/CriterionIcon'
import StandardLink from 'components/StandardLink'

import { ImmutableBrand } from 'types/data/brand'

interface BrandScreenProps {
  brand: ImmutableBrand;
}

const BrandScreen: React.FC<BrandScreenProps> = ({ brand }) => {
  const { isMobile } = useResponsive()
  const [brandColor, oppBrandColor] = useBrandColor(brand)

  return (
    <>
      <Page
        title={brand.get('name')}
        withScroll={isMobile}
        withFooter={false}
      >
        <Box
          background={{ color: brandColor }}
          direction={isMobile ? 'column' : 'row'}
        >
          <BrandCarousel
            width={isMobile ? '100%' : '50%'}
            brand={brand}
            color={brandColor}
            height={isMobile ? 'medium' : '100%'}
            overflow="hidden"
          />
          <Box
            width={isMobile ? '100%' : '50%'}
            overflow="auto"
          >
            <Box
              pad={isMobile ? 'large' : 'xlarge'}
              flex={false}
            >
              <Heading
                level={1}
                transform="uppercase"
              >
                {brand.get('name')}
              </Heading>

              {/* Location */}
              {brand.get('city') !== '' && brand.get('country') && (
                <Heading
                  level={2}
                  size="small"
                  color={oppBrandColor}
                >
                  {brand.get('city') && `${brand.get('city')}, `}
                  {brand.getIn(['country', 'name'])}
                </Heading>
              )}

              {/* Description */}
              <Paragraph
                size="large"
                font="Lato"
                color={oppBrandColor}
                margin={{ bottom: 'medium' }}
              >
                {brand.get('description')}
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
                {brand.get('criteria') && (
                  <Box direction="row" gap="small">
                    {brand.get('criteria').map((criterion) => (
                      <Box
                        key={criterion.get('name')}
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
                  ['Instagram', brand.get('instagram')],
                  ['Facebook', brand.get('facebook')],
                  ['Página web', brand.get('web')]
                ].map(([label, link]) => link && (
                  <StandardLink
                    href={link}
                    key={label}
                    external
                  >
                    <Button size="small">
                      {label}
                    </Button>
                  </StandardLink>
                ))}
              </Box>
            </Box>
          </Box>
        </Box>
      </Page>
    </>
  )
}

export default BrandScreen
