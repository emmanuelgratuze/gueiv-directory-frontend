import { useSelector } from 'react-redux'
import { Configuration } from 'types/data/configuration'
import { selectConfiguration } from 'store/data/selectors/configuration'

const useConfiguration = (): Configuration => {
  const configuration = useSelector(selectConfiguration)?.toJSON()
  return configuration
}

export default useConfiguration
