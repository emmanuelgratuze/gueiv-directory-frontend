import { useSelector } from 'react-redux'
import { selectAppConfig } from '~/store/app/selectors'
import { AppConfig } from '~/store/app/types'

const useAppConfig = (): AppConfig => (
  useSelector(selectAppConfig)
)

export default useAppConfig
