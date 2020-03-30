import app from './app'

const config: import('~/store/app/types').AppConfig = {
  ...app,
  api: {
    language: 'fr',
    host: 'http://localhost:1337',
    headers: {
      Accept: '*/*',
      'Content-Type': 'application/json',
      'Set-Cookie': 'HttpOnly;Secure;SameSite=Strict',
      'Access-Control-Allow-Origin': '*'
    }
  }
}

export default config
