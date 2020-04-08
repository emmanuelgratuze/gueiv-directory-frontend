import React from 'react'
import { Box } from 'grommet'
import { useSelector } from 'react-redux'

import Page from 'components/Page'
import Text from 'components/Text'
import Paragraph from 'components/Paragraph'
import Heading from 'components/Heading'
import Button from 'components/Button'
import CriterionIcon from 'components/CriterionIcon'
import StandardLink from 'components/StandardLink'

import BrandCarousel from 'components/BrandCarousel'
import useResponsive from 'hooks/useResponsive'
import useBrandColor from 'hooks/useBrandColor'

import { Criterion } from 'types/data/criterion'
import useConfiguration from 'hooks/useConfiguration'

interface CriteriaScreenProps {
  criteria: Criterion[];
}

const CriteriaScreen: React.FC<CriteriaScreenProps> = ({ criteria }) => {
  const configuration = useConfiguration()
  // const { isMobile } = useResponsive()
  // const [brandColor, oppBrandColor] = useBrandColor(brand)
  return (
    <>
      <Page title="Nuestros criterios">
        <Box margin={{ bottom: '2.2rem' }}>
          <Heading
            transform="uppercase"
            color="gray"
          >
            {configuration.criteriaPage.title}
          </Heading>
          <Paragraph>
            {configuration.criteriaPage.introduction}
          </Paragraph>

          {criteria.map((criterion) => (
            <Box
              key={criterion.name}
              width="2.2rem"
              height="2.2rem"
            >
              <CriterionIcon
                criterion={criterion}
                // color={oppBrandColor}
              />
            </Box>
          ))}
        </Box>

      </Page>
    </>
  )
}

export default CriteriaScreen
