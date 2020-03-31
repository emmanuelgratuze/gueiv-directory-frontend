import { useRef } from 'react'
import { useSelector } from 'react-redux'
import { isImmutable, fromJS } from 'immutable'
import { ImmutableAppState } from '~/store/app/types'

/*
  useSelector
  Select immutable state from store and convert it to JS
  (Extends react-redux useSelector hook to return pure JS values)
*/
function useImmutableSelector<TSelected = unknown>(
  selector: (state: ImmutableAppState) => any, // eslint-disable-line
  equalityFn?: (left: TSelected, right: TSelected) => boolean
): TSelected | undefined {
  const value = useRef<TSelected>()
  const jsValue = useRef<TSelected>()
  const previousValue = value.current

  value.current = useSelector(selector, equalityFn)

  if (previousValue !== value.current) {
    jsValue.current = isImmutable(value.current)
      ? (value.current || fromJS(undefined)).toJS()
      : value.current
  }

  return jsValue.current
}

export default useImmutableSelector
