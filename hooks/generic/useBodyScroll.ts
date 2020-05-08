import { useEffect, useState, useCallback, useMemo } from 'react'

type Result = {
  enableScroll: Function;
  disableScroll: Function;
  x: number;
  y: number;
}

/* Source: https://stackoverflow.com/questions/4770025/how-to-disable-scrolling-temporarily */
const useBodyScroll = (): Result => {
  const [scrollPosition, setScrollPosition] = useState({ y: 0, x: 0 })
  const handleScroll = (): void => {
    setScrollPosition({
      x: window.scrollX,
      y: window.scrollY
    })
  }

  useEffect(() => {
    document.addEventListener('scroll', handleScroll)
    return () => {
      document.removeEventListener('scroll', handleScroll)
    }
  }, [])

  // left: 37, up: 38, right: 39, down: 40,
  // spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
  const keys: { [key: number]: number } = {
    37: 1,
    38: 1,
    39: 1,
    40: 1
  }

  const wheelOpt = useMemo(() => {
    // modern Chrome requires { passive: false } when adding event
    let supportsPassive = false
    try {
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      window.addEventListener('test', () => {}, Object.defineProperty({}, 'passive', {
        // eslint-disable-next-line getter-return
        get: (): void => {
          supportsPassive = true
        }
      }))
    // eslint-disable-next-line no-empty
    } catch (e) {}
    return supportsPassive ? { passive: false } : false
  }, [])
  const preventDefault = useCallback((e: Event) => {
    e.preventDefault()
  }, [])
  const preventDefaultForScrollKeys = useCallback((e: KeyboardEvent) => {
    if (keys[e.keyCode]) {
      preventDefault(e)
      return false
    }
    return true
  }, [])
  const wheelEvent = 'onwheel' in document.createElement('div') ? 'wheel' : 'mousewheel'

  // call this to Disable
  function disableScroll(): void {
    window.addEventListener('DOMMouseScroll', preventDefault, false) // older FF
    window.addEventListener(wheelEvent, preventDefault, wheelOpt) // modern desktop
    window.addEventListener('touchmove', preventDefault, wheelOpt) // mobile
    window.addEventListener('keydown', preventDefaultForScrollKeys, false)
  }

  // call this to Enable
  function enableScroll(): void {
    window.removeEventListener('DOMMouseScroll', preventDefault, false)
    window.removeEventListener(wheelEvent, preventDefault, wheelOpt as EventListenerOptions)
    window.removeEventListener('touchmove', preventDefault, wheelOpt as EventListenerOptions)
    window.removeEventListener('keydown', preventDefaultForScrollKeys, false)
  }

  return {
    disableScroll,
    enableScroll,
    ...scrollPosition
  }
}

export default useBodyScroll
