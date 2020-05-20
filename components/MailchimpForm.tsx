import React, {
  useState,
  useEffect,
  useRef,
  SyntheticEvent,
  useMemo
} from 'react'
import {
  Box,
  Form,
  FormField,
  TextInputProps
} from 'grommet'
import fetch from 'fetch-jsonp'

import Button from 'components/Button'
import TextInput from 'components/TextInput'
import Text from 'components/Text'

declare global {
  interface Window {
    mailchimpCallback: Function;
  }
}

type MailchimpFormType = {
  dark?: boolean;
  small?: boolean;
}

const MailchimpForm: React.FC<MailchimpFormType> = ({
  dark = false,
  small = false
}) => {
  const email = useRef<string>()
  const [message, setMessage] = useState<string | null>(null)
  const [status, setStatus] = useState<string | null>(null)

  const handleSubmit = (event: SyntheticEvent): void => {
    event.preventDefault()

    window.mailchimpCallback = (value: { result: string; msg: string }): void => {
      setStatus(value.result)
      setMessage(value.msg.split('<a href=')[0])
    }

    if (email.current) {
      const endpoint = `https://${process.env.MAILCHIMP_USERNAME}.us4.list-manage.com/subscribe/post-json?\
        u=${process.env.MAILCHIMP_U}&\
        id=${process.env.MAILCHIMP_ID}&\
        EMAIL=${email.current}&\
        c=mailchimpCallback`

      fetch(endpoint)
    }
  }

  const input = useMemo(() => (
    (props: TextInputProps) => (
      <TextInput
        size={small ? 'small' : undefined}
        color={dark ? 'white' : undefined}
        placeholderColor={dark ? 'light-4' : undefined}
        fontSize="small"
        {...props}
      />
    )
  ), [small, dark])

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

      <Box
        width="100%"
        align="center"
      >
        {status !== 'success' && (
          <>
            <Box width="18rem" margin={{ bottom: 'small' }}>
              <FormField
                name="EMAIL"
                placeholder="Tu email"
                type="email"
                margin="xsmall"
                validate={{
                  regexp: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
                  message: '¡Tu e-mail no es valido!'
                }}
                onChange={(e) => {
                  setMessage(null)
                  setStatus(null)
                  email.current = e.currentTarget.value
                }}
                component={input}
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
                color="pink"
                hoverColor={dark ? 'white' : 'gray'}
                as="input"
                type="submit"
                value="Enviar"
                small
              />
            </Box>
          </>
        )}
      </Box>
    </Form>
  )
}

export default MailchimpForm
