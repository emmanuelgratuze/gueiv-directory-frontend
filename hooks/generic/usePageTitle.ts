import useConfiguration from '../app/useConfiguration'

const usePageTitle = (title?: string | null | undefined): string => {
  const configuration = useConfiguration()
  const siteTitle = configuration.getIn(['general', 'title'])
  return `${title || ''}${siteTitle ? ` | ${siteTitle}` : ''}`
}

export default usePageTitle
