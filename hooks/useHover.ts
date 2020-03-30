import {
  useEffect,
  useRef,
  useState,
  RefObject
} from 'react'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const useHover = (): [RefObject<any>, boolean] => {
  const [value, setValue] = useState(false)

  const ref = useRef<Node>(null)

  const handleMouseOver = (): void => setValue(true)
  const handleMouseOut = (): void => setValue(false)

  useEffect(
    () => {
      const node = ref.current
      if (node) {
        node.addEventListener('mouseover', handleMouseOver)
        node.addEventListener('mouseout', handleMouseOut)

        return () => {
          node.removeEventListener('mouseover', handleMouseOver)
          node.removeEventListener('mouseout', handleMouseOut)
        }
      }

      // eslint-disable-next-line @typescript-eslint/no-empty-function
      return () => {}
    },
    [ref.current] // Recall only if ref changes
  )

  return [ref, value]
}

export default useHover
