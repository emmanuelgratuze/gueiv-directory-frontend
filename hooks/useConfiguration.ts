import { useSelector } from 'react-redux'
import { ImmutableConfiguration } from 'types/data/configuration'
import { selectConfiguration } from 'store/data/selectors/configuration'

const useConfiguration = (): ImmutableConfiguration => (
  useSelector(selectConfiguration)
)

export default useConfiguration
