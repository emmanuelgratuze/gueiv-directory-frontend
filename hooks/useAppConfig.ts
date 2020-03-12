import { useSelector } from 'react-redux'
import { selectAppConfig } from '@store/entities/app/selectors'

const useAppConfig = () => {
  return useSelector(selectAppConfig);
}

export default useAppConfig
