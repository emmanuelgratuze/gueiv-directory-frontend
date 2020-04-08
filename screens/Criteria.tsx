import React from 'react'
import { Box } from 'grommet'

import Page from 'components/Page'
import Paragraph from 'components/Paragraph'
import Heading from 'components/Heading'
import CriterionIcon from 'components/CriterionIcon'

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
