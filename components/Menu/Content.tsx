import React from 'react'
import { Box } from 'grommet'
import { motion, useAnimation } from 'framer-motion'
import ReactMarkdown from 'react-markdown'
import styled from 'styled-components'

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

import BackgroundWave from 'components/BackgroundWave'

const Logo = require('assets/images/logo-white.svg').ReactComponent

const ProjectDescription = styled(Text)`
  strong {
    color: ${(props) => props.theme.global.colors.yellow};
  }
`

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
    medium: ['35%', '65%']
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
        zIndex: 11,
        height: !isMobile ? '90%' : undefined
      }}
    >
      <Box
        fill="vertical"
        pad={{ top: header.height }}
        align={isMobile ? 'start' : 'center'}
        justify={isMobile ? 'start' : 'center'}
      >
        <Box
          flex={false}
          direction={isMobile ? 'column-reverse' : 'row'}
          align={isMobile ? 'start' : 'center'}
        >

          <Box
            margin={{ bottom: 'medium' }}
            align="center"
            justify="center"
            width={getChildrenSizeByIndex(0)}
          >
            <Link href="/" passHref>
              <A>
                <Box fill align="center" margin={{ bottom: 'small' }}>
                  <Logo
                    width={isMobile ? '6rem' : '12rem'}
                    height="6rem"
                  />
                </Box>
              </A>
            </Link>

            <Box
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
                    color="pink"
                  />
                  <Text
                    font="Quicksand"
                    transform="uppercase"
                    weight="bold"
                    color="pink"
                  >
                    Sigue nuestros pasos!
                  </Text>
                </Box>
              </StandardLink>
              <StandardLink href={`mailto:${configuration.getIn(['social', 'email'])}`}>
                <Text
                  color="white"
                  weight="bold"
                  transform="uppercase"
                >
                  {configuration.getIn(['social', 'email'])}
                </Text>
              </StandardLink>
            </Box>
          </Box>


          <Box
            align={isMobile ? 'center' : 'start'}
            pad={isSmallMobile ? 'medium' : 'large'}
            width={getChildrenSizeByIndex(1)}
          >

            <Box
              margin={{ bottom: isMobile ? 'medium' : 'small' }}
              width={{ max: '55rem' }}
            >
              <ProjectDescription
                textAlign="start"
                color="white"
                size="medium"
              >
                <ReactMarkdown source={configuration.getIn(['general', 'menuDescription'])} />
              </ProjectDescription>
            </Box>

            <Link href="/criterios" passHref>
              <A>
                <Button
                  color="pink"
                  hoverColor="white"
                  size={isMobile ? 'small' : 'medium'}
                >
                  Ver todos los criterios
                </Button>
              </A>
            </Link>
          </Box>
        </Box>
      </Box>
      {!isMobile && (
        <BackgroundWave
          YPosition={90}
        />
      )}
    </motion.div>
  )
}

export default MenuContent
