import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { logPageView, initGA } from 'utils/analytics'

const useAnalytics = (trackingId: string): void => {
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
}

export default useAnalytics
