import { useCallback, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setMenuOpenState } from 'store/interface/actions'
import { selectIsMenuOpen } from 'store/interface/selectors'
import { useRouter } from 'next/router'

type UseMenuState = {
  isMenuOpen: boolean;
  toggleMenu: Function;
}

const useMenuState = (): UseMenuState => {
  const dispatch = useDispatch()
  const isMenuOpen = useSelector(selectIsMenuOpen)

  const setMenuState = useCallback((value = false) => dispatch(setMenuOpenState(value)), [])
  const toggleMenu = useCallback((value) => setMenuState(!isMenuOpen), [isMenuOpen])
  const closeMenu = useCallback(() => setMenuState(false), [])

  const router = useRouter()
  useEffect(() => {
    router.events.on('routeChangeStart', closeMenu)
    return () => {
      router.events.off('routeChangeStart', closeMenu)
    }
  }, [])

  return {
    isMenuOpen,
    toggleMenu
  }
}

export default useMenuState
