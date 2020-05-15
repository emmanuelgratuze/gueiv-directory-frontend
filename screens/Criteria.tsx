import React, { useState, RefObject } from 'react'
import { Box, Stack } from 'grommet'
import { List } from 'immutable'
import { motion, AnimatePresence } from 'framer-motion'
import ReactMarkdown from 'react-markdown'

import Page from 'components/Page'
import Paragraph from 'components/Paragraph'
import Heading from 'components/Heading'
import CriterionIcon from 'components/CriterionIcon'
import Container from 'components/Container'
import Text from 'components/Text'
import ScrollableItem from 'components/ScrollableItem'

import useConfiguration from 'hooks/app/useConfiguration'
import useTheme from 'hooks/generic/useTheme'
import useResponsive from 'hooks/generic/useResponsive'

import { keys } from 'utils/object'

import { ImmutableCriterion } from 'types/data/criterion'
import BackgroundWave from 'components/BackgroundWave'
import styled from 'styled-components'
import { Down } from 'grommet-icons'

interface CriteriaScreenProps {
  criteria: List<ImmutableCriterion>;
}

const WaveWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`

const AnimatedContent = motion.div

const CriteriaScreen: React.FC<CriteriaScreenProps> = ({ criteria }) => {
  const configuration = useConfiguration()
  const { brandColors, oppositeColors } = useTheme()
  const { isMobile, isTablet } = useResponsive()
  const colorNames = keys(brandColors)
  const [currentIndex, setCurrentIndex] = useState<number>()
  const refs: { [key: string]: RefObject<HTMLDivElement> } = {}
  const areHeaderIconsVisibles = typeof currentIndex !== 'undefined' && currentIndex > -1 && !isTablet && !isMobile
  const currentColor = colorNames[(currentIndex || 0) % colorNames.length]

  return (
    <>
      <Page
        title="Nuestros criterios"
        headerChildren={(
          <AnimatePresence>
            {areHeaderIconsVisibles && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                style={{ height: '100%' }}
              >
                <Box
                  direction="row"
                  align="center"
                  justify="center"
                  fill="vertical"
                >
                  {criteria.map((criterion, index) => (
                    <Box
                      width="1.2rem"
                      height="1.2rem"
                      margin={{ left: 'small' }}
                    >
                      <CriterionIcon
                        criterion={criterion}
                        color={currentIndex === index ? currentColor : 'white'}
                        hoverColor={currentColor}
                        clickable
                        tooltipPosition="bottom"
                      />
                    </Box>
                  ))}
                </Box>
              </motion.div>
            )}
          </AnimatePresence>
        )}
      >
        <Stack guidingChild="last">
          <Box>
            <ScrollableItem
              onScrollEnter={() => {
                setCurrentIndex(-1)
                window.history.pushState(null, document.title, '#')
              }}
            >
              <Container
                height={!isMobile ? '65vh' : undefined}
                pad="medium"
              >
                <Box
                  justify="center"
                  align="center"
                  fill
                >
                  <Box
                    width="large"
                    align="center"
                  >
                    <Heading
                      transform="uppercase"
                      color="white"
                      textAlign="center"
                      level={1}
                      size="large"
                    >
                      {configuration.getIn(['criteria-page', 'title'])}
                    </Heading>
                    <Paragraph
                      textAlign="center"
                      color="white"
                      size="large"
                    >
                      <ReactMarkdown source={configuration.getIn(['criteria-page', 'introduction'])} />
                    </Paragraph>

                    <Box
                      direction="row"
                      wrap
                      gap="small"
                      margin={{ top: 'medium' }}
                      align="center"
                      justify="center"
                    >
                      {criteria.map((criterion, index) => (
                        <Box
                          width="2rem"
                          height="2rem"
                          pad="0.3rem"
                        >
                          <CriterionIcon
                            criterion={criterion}
                            color={colorNames[(index) % colorNames.length]}
                            hoverColor="white"
                            clickable
                          />
                        </Box>
                      ))}
                    </Box>
                  </Box>
                </Box>
              </Container>
            </ScrollableItem>
            <Box align="center" pad={{ bottom: 'large' }}>
              <motion.div
                animate={{ y: [0, 10] }}
                transition={{
                  yoyo: Infinity,
                  ease: 'easeInOut'
                }}
              >
                <Down color="yellow" />
              </motion.div>
            </Box>
            {criteria.map((criterion, index) => (
              <ScrollableItem
                onScrollEnter={() => {
                  setCurrentIndex(index)
                  window.history.pushState(null, document.title, `#${criterion.get('id')}`)
                }}
                key={criterion.get('id')}
              >
                <Box
                  fill
                  ref={refs[`#${criterion.get('id')}`]}
                  background={!isMobile ? undefined : { color: colorNames[(index) % colorNames.length] }}
                  pad={isMobile ? { vertical: 'large' } : undefined}
                >
                  <WaveWrapper>
                    <Container pad="medium">
                      <Box
                        id={criterion.get('id')}
                        direction={isMobile ? 'column' : 'row'}
                        height={!isMobile ? '75vh' : undefined}
                        align="center"
                        justify="center"
                        fill="horizontal"
                        style={{
                          position: 'relative',
                          top: 0,
                          zIndex: 11
                        }}
                      >
                        <Box
                          width="30%"
                          align="center"
                          justify="center"
                        >
                          <AnimatedContent
                            animate={{
                              opacity: currentIndex === index ? 1 : 0,
                              scale: currentIndex === index ? 1 : 0.9,
                              rotate: currentIndex === index ? 0 : '3deg',
                              y: currentIndex === index ? 0 : 10
                            }}
                            transition={{
                              duration: 0.7,
                              ease: 'easeOut'
                            }}
                          >
                            <Box
                              key={criterion.get('name')}
                              width="small"
                              height="small"
                              gap="medium"
                            >
                              <CriterionIcon
                                criterion={criterion}
                                color={oppositeColors[colorNames[(index) % colorNames.length]]}
                              />
                              <Heading
                                transform="uppercase"
                                level={2}
                                size="small"
                                textAlign="center"
                                color={oppositeColors[colorNames[(index) % colorNames.length]]}
                              >
                                {criterion.get('name')}
                              </Heading>
                            </Box>
                          </AnimatedContent>
                        </Box>
                        <Box
                          width={!isMobile ? '50%' : undefined}
                          align="start"
                          justify="center"
                          margin={!isMobile ? { left: 'medium' } : undefined}
                        >
                          <Box width="35rem">
                            <AnimatedContent
                              animate={{
                                opacity: currentIndex === index ? 1 : 0,
                                y: currentIndex === index ? 0 : 10,
                              }}
                              transition={{
                                duration: 0.7,
                                delay: 0.3,
                                ease: 'easeOut'
                              }}
                            >
                              <Text
                                size={isMobile ? 'small' : '1.1rem'}
                                textAlign={isMobile ? 'center' : 'start'}
                                color={oppositeColors[colorNames[(index) % colorNames.length]]}
                                style={{
                                  lineHeight: '1.6rem'
                                }}
                              >
                                <ReactMarkdown source={criterion.get('description')} />
                              </Text>
                            </AnimatedContent>
                          </Box>
                        </Box>
                      </Box>
                    </Container>

                    {!isMobile && (
                      <BackgroundWave
                        YPosition={10}
                        pointsLength={3}
                        color={colorNames[(index) % colorNames.length]}
                        style={{
                          top: '-10vh',
                        }}
                        intervalDuration={1500}
                        intensity={2}
                      />
                    )}
                  </WaveWrapper>
                </Box>
              </ScrollableItem>
            ))}
          </Box>
        </Stack>
      </Page>
    </>
  )
}

export default CriteriaScreen
