import { useEffect, useState } from 'react'

type ScrollPosition = {
  x: number;
  y: number;
}

function useScrollPosition(): ScrollPosition {
  const [scrollPosition, setScrollPosition] = useState({ y: 0, x: 0 })
  const handleScroll = (): void => {
    setScrollPosition({ x: window.scrollX, y: window.scrollY })
  }

  useEffect(() => {
    document.addEventListener('scroll', handleScroll)
    return () => {
      document.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return scrollPosition
}

export default useScrollPosition
