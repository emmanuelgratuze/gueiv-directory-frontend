import { useRef } from 'react'
import { useSelector } from 'react-redux'
import { isImmutable, fromJS } from 'immutable'
import { AppState } from '~/store/app/types'

/*
  useSelector
  Select immutable state from store and convert it to JS
  (Extends react-redux useSelector hook to return pure JS values)
*/
function useImmutableSelector<TSelected = unknown>(
  selector: (state: AppState) => any, // eslint-disable-line
  equalityFn?: (left: TSelected, right: TSelected) => boolean
): TSelected | null {
  const value = useRef<TSelected | null>(null)
  const jsValue = useRef<TSelected | null>(null)
  const previousValue = value.current

  value.current = useSelector<AppState, TSelected>(selector, equalityFn)

  if (previousValue !== value.current) {
    jsValue.current = isImmutable(value.current)
      ? (value.current || fromJS(undefined)).toJS()
      : value.current
  }

  return jsValue.current
}

export default useImmutableSelector
