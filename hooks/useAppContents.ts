import { useSelector } from 'react-redux'
import { selectAppContents } from '~/store/app/selectors'
import { ImmutableAppContents } from '~/contents/types'

const useAppContents = (): ImmutableAppContents => (
  useSelector(selectAppContents)
)

export default useAppContents
