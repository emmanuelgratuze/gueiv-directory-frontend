import React from 'react'
import { Box } from 'grommet'

import Page from 'components/Page'
import Paragraph from 'components/Paragraph'
import Heading from 'components/Heading'
import CriterionIcon from 'components/CriterionIcon'

import useConfiguration from 'hooks/useConfiguration'
import useTheme from 'hooks/useTheme'
import { ImmutableCriterion } from 'types/data/criterion'
import { List } from 'immutable'
import Container from 'components/Container'

interface CriteriaScreenProps {
  criteria: List<ImmutableCriterion>;
}

const CriteriaScreen: React.FC<CriteriaScreenProps> = ({ criteria }) => {
  const configuration = useConfiguration()
  const { brandColors } = useTheme()
  const colorNames = Object.keys(brandColors)
  // const { isMobile } = useResponsive()
  // const [brandColor, oppBrandColor] = useBrandColor(brand)

  return (
    <>
      <Page title="Nuestros criterios">

        <Container>
          <Heading
            transform="uppercase"
            color="gray"
          >
            {configuration.getIn(['criteria-page', 'title'])}
          </Heading>
          <Paragraph>
            {configuration.getIn(['criteria-page', 'introduction'])}
          </Paragraph>
        </Container>

        {criteria.map((criterion, index) => (
          <Box
            key={criterion.get('id')}
            background={{ color: colorNames[index % colorNames.length] }}
            height="large"
          >
            <Container>
              <Box direction="row">
                <Box width="30%">
                  <Box
                    key={criterion.get('name')}
                    width="2.2rem"
                    height="2.2rem"
                  >
                    <CriterionIcon criterion={criterion} />
                  </Box>
                </Box>
                <Box width="70%">
                  <Heading
                    transform="uppercase"
                    color="gray"
                  >
                    {criterion.get('name')}
                  </Heading>
                  <Paragraph>
                    {criterion.get('description')}
                  </Paragraph>
                </Box>
              </Box>
            </Container>
          </Box>
        ))}
      </Page>
    </>
  )
}

export default CriteriaScreen
