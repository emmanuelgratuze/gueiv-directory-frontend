import React from 'react'
import { Box, Paragraph } from 'grommet'
import { motion, useAnimation } from 'framer-motion'

import Button from 'components/Button'
import Text from 'components/Text'
import A from 'components/A'

import useTheme from 'hooks/generic/useTheme'
import useConfiguration from 'hooks/app/useConfiguration'
import useResponsiveGrid from 'hooks/generic/useResponsiveGrid'
import Link from 'next/link'
import { Instagram } from 'grommet-icons'
import StandardLink from 'components/StandardLink'
import useResponsive from 'hooks/generic/useResponsive'

import BackgroundWave from './BackgroundWave'

const Logo = require('assets/images/logo.svg').ReactComponent

type MenuContentProps = {
  open: boolean;
}


const MenuContent: React.FC<MenuContentProps> = ({
  open = false
}) => {
  const { theme: { header } } = useTheme()
  const { isMobile, isSmallMobile } = useResponsive()
  const configuration = useConfiguration()
  const animationControls = useAnimation()
  const { getChildrenSizeByIndex } = useResponsiveGrid({
    small: ['full'],
    medium: ['50%']
  })

  animationControls.mount()

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: open ? 1 : 0 }}
      transition={{
        duration: 1,
        delay: open ? 0.7 : 0
      }}

      // On top of svg background
      style={{
        position: 'relative',
        height: '80%',
        zIndex: 11
      }}
    >
      <Box
        fill="vertical"
        pad={{ top: isMobile ? '0' : header.height }}
        // width={isMobile ? '100%' : '30%'}
        align="center"
        justify="center"
        overflow={isMobile ? { vertical: 'scroll' } : undefined}
      >
        <Box
          flex={false}
          pad={isMobile ? 'small' : 'large'}
          direction="row"
          wrap
        >
          <Box
            align="center"
            pad="small"
            width={getChildrenSizeByIndex(0)}
          >

            <div style={{ maxWidth: '30rem' }}>
              <Text weight="bold">
                <Paragraph
                  textAlign="center"
                  margin={{ bottom: isMobile ? 'medium' : 'large' }}
                  // color="white"
                  color="blue"
                  size={isMobile ? 'small' : 'large'}
                >
                  {configuration.getIn(['general', 'menuDescription'])}
                </Paragraph>
              </Text>
            </div>

            <Link href="/criterios">
              <A>
                <Button
                  // color="white"
                  color="blue"
                  hoverColor="gray"
                  size={isMobile ? 'small' : 'medium'}
                >
                  Ver todos los criterios
                </Button>
              </A>
            </Link>
          </Box>

          <Box
            margin={{ bottom: 'medium' }}
            align="center"
            justify="center"
            width={getChildrenSizeByIndex(1)}
          >
            <Link href="/">
              <A>
                <Box fill align="center" margin={{ bottom: 'small' }}>
                  <Logo
                    width={isMobile ? '6rem' : '10rem'}
                    height="7rem"
                  />
                </Box>
              </A>
            </Link>

            <Box
              direction={isSmallMobile ? 'row' : 'column'}
              gap="medium"
              align="center"
            >
              <StandardLink href={configuration.getIn(['social', 'instagram'])} external>
                <Box
                  direction="row"
                  gap="small"
                  justify="center"
                  align="center"
                >
                  <Instagram
                    size="2rem"
                    color="blue"
                    // color="white"
                  />
                  {!isSmallMobile && (
                    <Text
                      font="Quicksand"
                      transform="uppercase"
                      weight="bold"
                      color="blue"
                      // color="white"
                    >
                      Sigue nuestros pasos!
                    </Text>
                  )}
                </Box>
              </StandardLink>
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
      <BackgroundWave />
    </motion.div>
  )
}

export default MenuContent
