import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

import ReactGA from 'react-ga'

const initGA = (trackingId: string): void => {
  ReactGA.initialize(trackingId)
}
const logPageView = (): void => {
  ReactGA.set({ page: window.location.pathname })
  ReactGA.pageview(window.location.pathname)
}
const logEvent = (category = '', action = ''): void => {
  if (category && action) {
    ReactGA.event({ category, action })
  }
}
const logException = (description = '', fatal = false): void => {
  if (description) {
    ReactGA.exception({ description, fatal })
  }
}

type ReturnValue = {
  logEvent: typeof logEvent;
  logException: typeof logException;
}

const useAnalytics = (trackingId: string): ReturnValue => {
  const [gaInitialized, setGaInitialized] = useState(false)
  const router = useRouter()

  const handleRouteChangeStart = (): void => {
    window.scrollTo(0, 0)
  }
  const handleRouteChangeComplete = (): void => {
    setTimeout(() => {
      logPageView()
    }, 0)
  }

  useEffect(() => {
    router.events.on('routeChangeStart', handleRouteChangeStart)
    router.events.on('routeChangeComplete', handleRouteChangeComplete)

    if (!gaInitialized) {
      initGA(trackingId)
      setGaInitialized(true)
      logPageView()
    }

    return () => {
      router.events.off('routeChangeComplete', handleRouteChangeComplete)
      router.events.off('routeChangeStart', handleRouteChangeStart)
    }
  }, [])

  return {
    logEvent,
    logException
  }
}

export default useAnalytics
