import React, { useEffect } from 'react'
import { Box, Paragraph, Layer } from 'grommet'
import { motion, AnimatePresence, useAnimation } from 'framer-motion'

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

const Logo = require('assets/images/logo-white.svg').ReactComponent

type MenuContentProps = {
  open: boolean;
}

const wrapperStyles = {
  open: {
    opacity: 1
  },
  closed: {
    opacity: 0
  }
}

const MenuContent: React.FC<MenuContentProps> = ({
  open = false
}) => {
  const { theme: { header } } = useTheme()
  const { isMobile } = useResponsive()
  const configuration = useConfiguration()
  const animationControls = useAnimation()
  const { getChildrenSizeByIndex } = useResponsiveGrid({
    small: ['full'],
    medium: ['50%']
  })

  useEffect(() => {
    animationControls.start(open ? wrapperStyles.open : wrapperStyles.closed)
  }, [open])

  animationControls.mount()

  return (
    <motion.div
      initial={wrapperStyles.closed}
      animate={animationControls}
      transition={{
        duration: 1,
        delay: open ? 0.7 : 0
      }}

      // On top of svg background
      style={{
        position: 'relative',
        height: '100%',
        zIndex: 11
      }}
    >
      <Box
        fill="vertical"
        pad={{ top: header.height }}
        // width={isMobile ? '100%' : '30%'}
        align="center"
        justify="center"
        overflow={isMobile ? { vertical: 'scroll' } : undefined}
      >
        <Box
          flex={false}
          pad={isMobile ? 'medium' : 'large'}
          direction="row"
          wrap
        >
          <Box
            align="center"
            pad="small"
            width={getChildrenSizeByIndex(0)}
          >

            <div style={{ maxWidth: '30rem' }}>
              <Paragraph
                textAlign="center"
                margin={{ bottom: 'large' }}
                color="white"
                size="large"
              >
                {configuration.getIn(['general', 'menuDescription'])}
              </Paragraph>
            </div>

            <Link href="/criterios">
              <A>
                <Button color="white">
                  Ver todos los criterios
                </Button>
              </A>
            </Link>
          </Box>

          <Box
            margin={{ bottom: 'medium' }}
            align="center"
            width={getChildrenSizeByIndex(1)}
          >
            <Link href="/">
              <A>
                <Box fill align="center">
                  <Logo width="10rem" height="100%" />
                </Box>
              </A>
            </Link>

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
    </motion.div>
  )
}

export default MenuContent
