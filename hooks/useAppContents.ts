import { useSelector } from 'react-redux'
import { selectAppContents } from '@store/entities/app/selectors'

const useAppContents = () => {
  return useSelector(selectAppContents)
}

export default useAppContents
