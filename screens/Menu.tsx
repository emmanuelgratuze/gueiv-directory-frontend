import React from 'react'
import { Box, Paragraph } from 'grommet'
import { motion, AnimatePresence } from 'framer-motion'

import Button from 'components/Button'
import Text from 'components/Text'
import A from 'components/A'

import useTheme from 'hooks/useTheme'
import styled from 'styled-components'
import useConfiguration from 'hooks/useConfiguration'
import Link from 'next/link'
import { Instagram } from 'grommet-icons'
import StandardLink from 'components/StandardLink'

const Logo = require('assets/images/logo.svg').ReactComponent

const MenuWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
`

type MenuScreenProps = {
  open?: boolean;
}

const MenuScreen: React.FC<MenuScreenProps> = ({ open = false }) => {
  const { theme: { header: { height } } } = useTheme()
  const configuration = useConfiguration()

  const AnimatedBox = motion.custom(Box)
  const AnimatedWrapper = motion.custom(MenuWrapper)

  return (
    <>
      {open && (
        <AnimatePresence exitBeforeEnter>
          <AnimatedWrapper
            initial={{ zIndex: 5 }}
            animate={{ zIndex: 5 }}
            exit={{ zIndex: -1 }}
          >
            <AnimatedBox
              fill
              background={{ color: 'blue' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Box fill pad={{ top: height }} justify="center">
                <Box pad="large" width="30%" align="center">
                  <Paragraph textAlign="center" margin={{ bottom: 'large' }}>
                    {configuration.getIn(['general', 'menuDescription'])}
                  </Paragraph>

                  <Box direction="row" margin={{ bottom: 'large' }}>
                    <Link href="/criterios">
                      <A>
                        <Button color="white">
                          Ver todos los criterios
                        </Button>
                      </A>
                    </Link>
                  </Box>

                  <Box margin={{ bottom: 'medium' }}>
                    <Link href="/">
                      <Box fill="vertical">
                        <A>
                          <Logo width="10rem" height="100%" />
                        </A>
                      </Box>
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

                  <Box>
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
            </AnimatedBox>
          </AnimatedWrapper>
        </AnimatePresence>
      )}
    </>
  )
}

export default MenuScreen
