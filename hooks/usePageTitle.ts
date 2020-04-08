import useConfiguration from './useConfiguration'

const usePageTitle = (title?: string | null | undefined): string => {
  const configuration = useConfiguration()
  return `${title ? `${title} | ` : ''}${configuration.general?.title || ''}`
}

export default usePageTitle
