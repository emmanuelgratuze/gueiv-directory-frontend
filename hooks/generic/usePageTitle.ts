import useConfiguration from '../app/useConfiguration'

const usePageTitle = (title?: string | null | undefined): string => {
  const configuration = useConfiguration()
  return `${title ? `${title} | ` : ''}${configuration.getIn(['general', 'title']) || ''}`
}

export default usePageTitle
