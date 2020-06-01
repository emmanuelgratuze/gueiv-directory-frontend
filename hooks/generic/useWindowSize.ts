import { useState, useEffect } from 'react'
import useBrowser from 'hooks/generic/useBrowser'

type ReturnedValue = {
  width: number;
  height: number;
}

function useWindowSize(): ReturnedValue {
  const { isServerSide } = useBrowser()

  function getSize(): ReturnedValue {
    return {
      width: !isServerSide ? window.innerWidth : 0,
      height: !isServerSide ? window.innerHeight : 0
    }
  }

  const [windowSize, setWindowSize] = useState(getSize)

  useEffect(() => {
    if (isServerSide) {
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
