import configureStore from '~/store/index'
import { selectAppConfig } from '~/store/app/selectors'

const store = configureStore()

export const fetchBrands = async () => {
  const apiConfig = await selectAppConfig(store.getState()).get('api')
  const response = await fetch(`${apiConfig.get('host')}/brands`, {
    headers: {
      ...apiConfig.headers || {},
      'Accept-Language': apiConfig.get('language') || undefined
    }
  })
  return response.json()
}

export default {}
