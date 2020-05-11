import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

const useLoading = (): { isLoading: boolean; currentPage: string } => {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const handleRouteChangeStart = (): void => {
    window.scrollTo(0, 0)
    setIsLoading(true)
  }
  const handleRouteChangeComplete = (): void => {
    setIsLoading(false)
  }
  useEffect(() => {
    router.events.on('routeChangeStart', handleRouteChangeStart)
    router.events.on('routeChangeComplete', handleRouteChangeComplete)

    return () => {
      router.events.off('routeChangeComplete', handleRouteChangeComplete)
      router.events.off('routeChangeStart', handleRouteChangeStart)
    }
  }, [])
  return {
    isLoading,
    currentPage: router.pathname
  }
}

export default useLoading
