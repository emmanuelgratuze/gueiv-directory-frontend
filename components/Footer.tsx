import React from 'react'
import { Box } from 'grommet'
import { Facebook, Instagram } from 'grommet-icons'
import Link from 'next/link'

import Paragraph from 'components/Paragraph'
import Text from 'components/Text'
import Container from 'components/Container'
import Heading from 'components/Heading'
import ResponsiveGrid from 'components/ResponsiveGrid'
import A from 'components/A'

import useTheme from 'hooks/generic/useTheme'
import useResponsive from 'hooks/generic/useResponsive'
import useConfiguration from 'hooks/app/useConfiguration'

import StandardLink from './StandardLink'
import MailchimpForm from './MailchimpForm'

const FooterHeading: React.FC = ({ ...props }) => (
  <Heading level={3} color="blue" transform="uppercase" {...props} />
)

const Footer: React.FC = () => {
  const configuration = useConfiguration()
  const { isMobile } = useResponsive()
  const { colors, brandColors } = useTheme()

  return (
    <Box
      background={{ color: 'light-1' }}
      pad={{ top: 'large', bottom: 'medium' }}
      style={{
        zIndex: 15
      }}
    >
      <Container>
        <ResponsiveGrid
          columns={{
            small: ['full'],
            medium: ['33.33%'],
          }}
        >
          <Box
            align="center"
            margin={{ bottom: isMobile ? 'large' : 'medium' }}
          >
            <FooterHeading>Sé parte</FooterHeading>
            <Paragraph
              size="small"
              color="dark-4"
              transform="uppercase"
              textAlign="center"
            >
              ¿Tienes una marca sostenible y quieres estar en el directorio? Escríbenos a:
              <br />
              <StandardLink href={`mailto:${configuration.getIn(['social', 'email'])}`}>
                <Text
                  color="pink"
                  weight="bold"
                  transform="initial"
                >
                  {configuration.getIn(['social', 'email'])}
                </Text>
              </StandardLink>
            </Paragraph>
          </Box>
          <Box
            align="center"
            gap="small"
            margin={{ bottom: isMobile ? 'large' : 'medium' }}
          >
            <FooterHeading>¡Sigue nuestros pasos!</FooterHeading>
            <Box direction="row" gap="medium">
              <StandardLink href={configuration.getIn(['social', 'instagram'])} external>
                <Instagram size="2rem" color={brandColors.blue} />
              </StandardLink>
              <StandardLink href={configuration.getIn(['social', 'facebook'])} external>
                <Facebook size="2rem" color={brandColors.blue} />
              </StandardLink>
            </Box>
          </Box>
          <Box
            align="center"
          >
            <FooterHeading>Súbete a la nueva ola</FooterHeading>
            <MailchimpForm />
          </Box>
        </ResponsiveGrid>
      </Container>
      <Box margin={{ top: 'medium' }}>
        <Text
          size="small"
          color="gray"
          textAlign="center"
        >
          <Link href="/aviso-legal" passHref>
            <A
              style={{ color: colors['dark-5'] as string }}
            >
              Aviso legal
            </A>
          </Link>
        </Text>
      </Box>
    </Box>
  )
}

export default Footer
