import configureStore from '~/store/index'
import { selectAppConfig } from '~/store/app/selectors'
import { Brand } from '~/store/entities/brands/types'

const store = configureStore()

export const fetchBrands = async (): Promise<Brand[]> => {
  const apiConfig = await selectAppConfig(store.getState()).get('api')
  const response = await fetch(`${apiConfig.get('host')}/brands`, {
    headers: {
      ...apiConfig.headers || {},
      'Accept-Language': apiConfig.get('language') || undefined
    }
  })

  let data: Brand[] = await response.json()

  // Delete entries without name
  data = data.filter((brand) => !!brand.name)
  return data
}

export default {}
