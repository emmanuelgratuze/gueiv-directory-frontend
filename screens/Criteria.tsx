import React, {
  useState,
  useEffect,
  RefObject,
  createRef
} from 'react'
import { Box } from 'grommet'
import { List } from 'immutable'
import { motion } from 'framer-motion'
import { keys } from 'utils/object'

import Page from 'components/Page'
import Paragraph from 'components/Paragraph'
import Heading from 'components/Heading'
import CriterionIcon from 'components/CriterionIcon'
import Container from 'components/Container'
import ScrollableItem from 'components/ScrollableItem'

import useConfiguration from 'hooks/useConfiguration'
import useTheme from 'hooks/useTheme'
import { ImmutableCriterion } from 'types/data/criterion'

interface CriteriaScreenProps {
  criteria: List<ImmutableCriterion>;
}

const CriteriaScreen: React.FC<CriteriaScreenProps> = ({ criteria }) => {
  const configuration = useConfiguration()
  const { brandColors, oppositeColors } = useTheme()
  const colorNames = keys(brandColors)
  const [backgroundColorName, setBackgroundColorName] = useState(colorNames[0])
  const refs: { [key: string]: RefObject<HTMLDivElement> } = {}
  criteria.forEach((criterion) => {
    refs[`#${criterion.get('id')}`] = createRef()
  })
  useEffect(() => {
    if (
      window.location.hash !== ''
      && window.location.hash in refs
      && refs[window.location.hash]?.current !== null
    ) {
      window.scrollTo(0, refs[window.location.hash].current?.offsetTop || 0)
    }

    return () => {
      // window.removeEventListener('hashchange', handleHashChange)
    }
  }, [refs])

  return (
    <>
      <Page title="Nuestros criterios">
        <motion.div
          animate={{ backgroundColor: brandColors[backgroundColorName] }}
        >
          <Container height="85vh">
            <Box
              justify="center"
              align="center"
              fill
            >
              <Box width="large">
                <Heading
                  transform="uppercase"
                  color={oppositeColors[backgroundColorName]}
                  textAlign="center"
                  margin={{ bottom: '4rem' }}
                >
                  {configuration.getIn(['criteria-page', 'title'])}
                </Heading>
                <Paragraph
                  textAlign="center"
                  color={oppositeColors[backgroundColorName]}
                >
                  {configuration.getIn(['criteria-page', 'introduction'])}
                </Paragraph>
              </Box>
            </Box>
          </Container>
          {criteria.map((criterion, index) => (
            <ScrollableItem
              onScrollEnter={() => {
                setBackgroundColorName(colorNames[index % colorNames.length])
                window.history.pushState(null, document.title, `#${criterion.get('id')}`)
              }}
              key={criterion.get('id')}
            >
              <Box fill ref={refs[`#${criterion.get('id')}`]}>
                <Container>
                  <Box
                    id={criterion.get('id')}
                    direction="row"
                    height="90vh"
                    align="center"
                    justify="center"
                    fill="horizontal"
                  >
                    <Box
                      width="30%"
                      align="center"
                      justify="center"
                    >
                      <Box
                        key={criterion.get('name')}
                        width="small"
                        height="small"
                        gap="medium"
                      >
                        <CriterionIcon
                          criterion={criterion}
                          color={oppositeColors[backgroundColorName]}
                        />
                        <Heading
                          transform="uppercase"
                          level={2}
                          size="small"
                          textAlign="center"
                          color={oppositeColors[backgroundColorName]}
                        >
                          {criterion.get('name')}
                        </Heading>
                      </Box>
                    </Box>
                    <Box
                      width="70%"
                      align="center"
                      justify="center"
                      flex={{ grow: 1 }}
                    >
                      <Box width="35rem">
                        <Paragraph
                          size="large"
                          textAlign="center"
                          color={oppositeColors[backgroundColorName]}
                        >
                          {criterion.get('description')}
                        </Paragraph>
                      </Box>
                    </Box>
                  </Box>
                </Container>
              </Box>
            </ScrollableItem>
          ))}
        </motion.div>
      </Page>
    </>
  )
}

export default CriteriaScreen
