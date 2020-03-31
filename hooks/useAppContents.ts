import { selectAppContents } from '~/store/app/selectors'
import { AppContents } from '~/contents/types'
import useSelector from '~/hooks/useSelector'

const useAppContents = (): AppContents | undefined => (
  useSelector(selectAppContents)
)

export default useAppContents
