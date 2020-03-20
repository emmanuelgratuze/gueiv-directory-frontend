const config: import('~/store/app/types').AppConfig = {
  api: {
    language: 'fr',
    host: 'https://gueiv-admin.herokuapp.com',
    headers: {
      Accept: '*/*',
      'Content-Type': 'application/json',
      'Set-Cookie': 'HttpOnly;Secure;SameSite=Strict',
      'Access-Control-Allow-Origin': '*'
    }
  }
}

export default config
