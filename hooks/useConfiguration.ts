import useSelector from 'hooks/useSelector'
import { Configuration } from 'types/data/configuration'
import { selectConfiguration } from 'store/data/selectors/configuration'

const useConfiguration = (): Configuration | undefined => {
  const configuration = useSelector<Configuration>(selectConfiguration)
  return configuration
}

export default useConfiguration
