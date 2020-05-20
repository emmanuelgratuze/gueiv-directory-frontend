type UseBrowserType = {
  isFirefox: boolean;
}

export default function useBrowser(): UseBrowserType {
  return {
    isFirefox: typeof window !== 'undefined' && navigator.userAgent.search('Firefox') > -1
  }
}
