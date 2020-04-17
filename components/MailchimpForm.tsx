import React, { useCallback } from 'react'
import { Box, TextInput } from 'grommet'
import fetch from 'isomorphic-fetch'

import Button from 'components/Button'
import Text from 'components/Text'

const MailchimpForm: React.FC = () => {
  // const [errorMessage, setErrorMessage] = useState(null)

  const handleSubmit = useCallback(async (event) => {
    event.preventDefault()
    const endpoint = `https://${process.env.MAILCHIMP_USERNAME}.us4.list-manage.com/subscribe/post-json?u=${process.env.MAILCHIMP_U}&id=${process.env.MAILCHIMP_ID}&c=`
    const result = await fetch(endpoint, {
      method: 'POST',
      body: new FormData(event.currentTarget),
      credentials: 'include'
    })
    // eslint-disable-next-line no-console
    console.log(result)
  }, [])

  return (
    <form onSubmit={handleSubmit}>
      <Box width="16rem" margin={{ bottom: 'small' }}>
        <TextInput
          name="EMAIL"
          placeholder="Suscríbete con tu e-mail"
          type="email"
          required
        />
        <input type="hidden" name="b_664cf3e57f1fcf8ad1698389e_83630f6786" tabIndex={-1} value="" />
      </Box>
      <Box align="center">
        <Button
          hoverColor="pink"
          as="input"
          type="submit"
          value="Subscríbeme"
        />

        <Text color="status-critical">
          {/* {errorMessage} */}
        </Text>
      </Box>
    </form>
  )
}

export default MailchimpForm
