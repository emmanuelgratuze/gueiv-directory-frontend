type UseBrowserType = {
  isFirefox: boolean;
  isServerSide: boolean;
}

export default function useBrowser(): UseBrowserType {
  return {
    isServerSide: typeof window === 'undefined',
    isFirefox: typeof window !== 'undefined' && navigator.userAgent.search('Firefox') > -1
  }
}
