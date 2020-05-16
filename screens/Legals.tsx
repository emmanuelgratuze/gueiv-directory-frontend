import React from 'react'
import { Box } from 'grommet'
import styled from 'styled-components'
import ReactMarkdown from 'react-markdown'

import Page from 'components/Page'
import Text from 'components/Text'
import Container from 'components/Container'

import useConfiguration from 'hooks/app/useConfiguration'
import useResponsive from 'hooks/generic/useResponsive'

const TextContent = styled(Text)`
  h1 {
    margin-bottom: 2rem;
    color: ${(props) => props.theme.global.colors.blue};
  }

  a {
    color: ${(props) => props.theme.global.colors.blue};
  }
`

const LegalsScreen: React.FC = () => {
  const configuration = useConfiguration()
  const { isMobile } = useResponsive()

  return (
    <Page title={configuration.getIn(['legal-page', 'title'])}>
      <Box
        align="center"
        justify="center"
        direction="column"
        gap="medium"
        background={{ color: 'light-1' }}
        pad={{ vertical: isMobile ? 'medium' : 'large' }}
      >
        <Container>
          <TextContent
            color="gray"
          >
            <ReactMarkdown
              source={configuration.getIn(['legal-page', 'content'])}
            />
          </TextContent>
        </Container>
      </Box>
    </Page>
  )
}

export default LegalsScreen
