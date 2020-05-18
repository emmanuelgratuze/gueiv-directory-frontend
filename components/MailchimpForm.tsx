import React, { useCallback, useState, useEffect } from 'react'
import { Box, Form, FormField } from 'grommet'
import fetch from 'fetch-jsonp'

import Button from 'components/Button'
import Text from 'components/Text'

declare global {
  interface Window {
    mailchimpCallback: Function;
  }
}

const MailchimpForm: React.FC = () => {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState<string | null>(null)
  const [status, setStatus] = useState<string | null>(null)

  useEffect(() => {
    window.mailchimpCallback = (value: { result: string; msg: string }): void => {
      setStatus(value.result)
      setMessage(value.msg.split('<a href=')[0])
    }
  }, [])

  const handleSubmit = useCallback(async (event) => {
    event.preventDefault()
    const endpoint = `https://${process.env.MAILCHIMP_USERNAME}.us4.list-manage.com/subscribe/post-json?\
      u=${process.env.MAILCHIMP_U}&\
      id=${process.env.MAILCHIMP_ID}&\
      EMAIL=${email}&\
      c=mailchimpCallback`

    fetch(endpoint)
  }, [email])

  return (
    <Form
      onSubmit={handleSubmit}
      messages={{
        invalid: 'No es valido',
        required: '¡Pss! ¡Necesitamos tu e-mail!'
      }}
      noValidate
    >
      <div />
      {status === 'success' && (
        <Box fill align="center" justify="center" pad="medium">
          <Text color="pink" font="Lato" weight="bold">
            {message}
          </Text>
        </Box>
      )}

      {status !== 'success' && (
        <>
          <Box width="16rem" margin={{ bottom: 'small' }}>
            <FormField
              name="EMAIL"
              placeholder="Suscríbete con tu e-mail"
              type="email"
              margin="xsmall"
              validate={{
                regexp: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
                message: '¡Tu e-mail no es valido!'
              }}
              onChange={(e) => {
                setMessage(null)
                setStatus(null)
                setEmail(e.currentTarget.value)
              }}
              value={email}
              required
            />
            <input type="hidden" name="" tabIndex={-1} value="" />

            {message && (
              <Text
                size="xsmall"
                textAlign="center"
                weight="bold"
                transform="uppercase"
                color={status === 'error' ? 'status-critical' : 'gray'}
              >
                {message}
              </Text>
            )}
          </Box>
          <Box align="center">
            <Button
              hoverColor="pink"
              as="input"
              type="submit"
              value="Subscríbeme"
            />
          </Box>
        </>
      )}
    </Form>
  )
}

export default MailchimpForm
