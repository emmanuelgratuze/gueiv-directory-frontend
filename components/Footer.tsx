import React from 'react'
import { Box } from 'grommet'
import { Facebook, Instagram } from 'grommet-icons'

import Paragraph from 'components/Paragraph'
import Text from 'components/Text'
import Container from 'components/Container'
import Heading from 'components/Heading'
import ResponsiveGrid from 'components/ResponsiveGrid'
import useTheme from 'hooks/generic/useTheme'
import useConfiguration from 'hooks/app/useConfiguration'

import StandardLink from './StandardLink'
import MailchimpForm from './MailchimpForm'

const FooterHeading: React.FC = ({ ...props }) => (
  <Heading level={3} color="blue" transform="uppercase" {...props} />
)

const Footer: React.FC = () => {
  const configuration = useConfiguration()
  const { brandColors } = useTheme()

  return (
    <Box
      background={{ color: 'light-1' }}
      pad={{ vertical: 'large' }}
    >
      <Container>
        <ResponsiveGrid
          columns={{
            small: ['full'],
            medium: ['33.33%'],
          }}
        >
          <Box align="center" margin={{ bottom: 'medium' }}>
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
          <Box align="center" gap="small" margin={{ bottom: 'medium' }}>
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
          <Box align="center">
            <FooterHeading>Súbete a la nueva ola</FooterHeading>
            <MailchimpForm />
          </Box>
        </ResponsiveGrid>
      </Container>
    </Box>
  )
}

export default Footer
