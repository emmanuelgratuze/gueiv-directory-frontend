import React from 'react'
import { Box } from 'grommet'
import Link from 'next/link'

import Page from 'components/Page'
import Text from 'components/Text'
import Emoji from 'components/Emoji'
import A from 'components/A'
import Button from 'components/Button'

const ErrorScreen: React.FC = () => (
  <Page
    title="Home"
  >
    <Box
      height="70vh"
      align="center"
      justify="center"
      direction="column"
      gap="medium"
    >
      <Text
        textAlign="center"
        color="white"
      >
        Lo sentimos, no hay nada por aquí
        &thinsp;
        <Emoji symbol="🤷‍♂️" label="sorry" />
      </Text>
      <Link href="/">
        <A>
          <Button color="pink">
            Volver a las marcas
          </Button>
        </A>
      </Link>
    </Box>
  </Page>
)

export default ErrorScreen
