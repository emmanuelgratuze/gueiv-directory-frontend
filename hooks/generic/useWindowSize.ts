import { useState, useEffect } from 'react'

type ReturnedValue = {
  width: number;
  height: number;
}

function useWindowSize(): ReturnedValue {
  const isClient = typeof window === 'object'

  function getSize(): ReturnedValue {
    return {
      width: isClient ? window.innerWidth : 0,
      height: isClient ? window.innerHeight : 0
    }
  }

  const [windowSize, setWindowSize] = useState(getSize)

  useEffect(() => {
    if (!isClient) {
      return () => null
    }

    function handleResize(): void {
      setWindowSize(getSize())
    }

    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return windowSize
}

export default useWindowSize
