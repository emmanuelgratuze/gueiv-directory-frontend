import React from 'react'
import { Box, Paragraph, Layer } from 'grommet'
import { motion, AnimatePresence } from 'framer-motion'

import Button from 'components/Button'
import Text from 'components/Text'
import A from 'components/A'

import useTheme from 'hooks/useTheme'
import useConfiguration from 'hooks/useConfiguration'
import Link from 'next/link'
import { Instagram } from 'grommet-icons'
import StandardLink from 'components/StandardLink'
import useResponsive from 'hooks/useResponsive'

const Logo = require('assets/images/logo-white.svg').ReactComponent

type MenuScreenProps = {
  open?: boolean;
}

const MenuScreen: React.FC<MenuScreenProps> = ({ open = false }) => {
  const { theme: { header } } = useTheme()
  const { isMobile } = useResponsive()
  const configuration = useConfiguration()
  const AnimatedBox = motion.custom(Box)

  return (
    <>
      {open && (
        <Layer
          plain
          full
          animation={false}
        >
          <AnimatePresence exitBeforeEnter>
            <AnimatedBox
              fill
              background={{ color: 'gray' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Box
                fill="vertical"
                pad={{ top: header.height }}
                width={isMobile ? '100%' : '30%'}
                align="center"
                justify="center"
                overflow={isMobile ? { vertical: 'scroll' } : undefined}
              >
                <Box
                  fill
                  overflow={isMobile ? 'scroll' : undefined}
                  pad={isMobile ? { bottom: 'xlarge' } : undefined}
                >
                  <Box
                    flex={false}
                    pad={isMobile ? 'medium' : 'large'}
                  >
                    <Box align="center">
                      <Box width={{ max: '20rem' }}>
                        <Paragraph
                          textAlign="center"
                          margin={{ bottom: 'large' }}
                        >
                          {configuration.getIn(['general', 'menuDescription'])}
                        </Paragraph>
                      </Box>
                    </Box>

                    <Box justify="center" direction="row" margin={{ bottom: 'medium' }}>
                      <Link href="/criterios">
                        <A>
                          <Button color="white">
                            Ver todos los criterios
                          </Button>
                        </A>
                      </Link>
                    </Box>

                    <Box fill="horizontal" margin={{ bottom: 'medium' }}>
                      <Link href="/">
                        <A>
                          <Box fill align="center">
                            <Logo width="10rem" height="100%" />
                          </Box>
                        </A>
                      </Link>
                    </Box>

                    <Box margin={{ bottom: 'xsmall' }}>
                      <StandardLink href={configuration.getIn(['social', 'instagram'])} external>
                        <Box direction="row" gap="small" justify="center">
                          <Instagram size="2rem" color="white" />
                          <Text
                            font="Quicksand"
                            transform="uppercase"
                            weight="bold"
                            color="white"
                          >
                            Sigue nuestros pasos!
                          </Text>
                        </Box>
                      </StandardLink>
                    </Box>

                    <Box align="center">
                      <StandardLink href={`mailto:${configuration.getIn(['social', 'email'])}`}>
                        <Text
                          color="yellow"
                          weight="bold"
                          transform="uppercase"
                        >
                          {configuration.getIn(['social', 'email'])}
                        </Text>
                      </StandardLink>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </AnimatedBox>
          </AnimatePresence>
        </Layer>
      )}
    </>
  )
}

export default MenuScreen
