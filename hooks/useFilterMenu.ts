import { useCallback, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useRouter } from 'next/router'
import { Record } from 'immutable'

import { closeFilterMenu, openFilterMenu } from 'store/interface/filters/actions'
import { selectFiltersMenuState } from 'store/interface/filters/selectors'

type UseMenuState = {
  state: Record<{
    isOpen: boolean;
    filterId: string;
  }>;
  isOpen: boolean;
  toggle: Function;
  close: Function;
}

const useFilterMenu = (): UseMenuState => {
  const dispatch = useDispatch()
  const state = useSelector(selectFiltersMenuState)

  const close = useCallback(() => dispatch(closeFilterMenu()), [])
  const toggle = useCallback((filterId) => {
    const action = state.get('filterId') === filterId || !filterId
      ? closeFilterMenu()
      : openFilterMenu(filterId)

    dispatch(action)
  }, [state])

  const router = useRouter()
  useEffect(() => {
    router.events.on('routeChangeStart', close)
    return () => {
      router.events.off('routeChangeStart', close)
    }
  }, [])

  return {
    state,
    isOpen: state.get('isOpen'),
    toggle,
    close
  }
}

export default useFilterMenu
