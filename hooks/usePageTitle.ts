
import useAppContents from './useAppContents'

const usePageTitle = (title?: string | null | undefined): string => {
  const contents = useAppContents()
  return `${contents.getIn(['general', 'title'])}${title ? ` | ${title}` : ''}`
}

export default usePageTitle
