import React, { useEffect, useState, createRef } from 'react'
import useWindowSize from 'hooks/useWindowSize'
import useScrollPosition from 'hooks/useScrollPosition'

type ScrollableItemProps = {
  onScrollEnter?: Function;
  onScrollLeave?: Function;
}

const ScrollableItem: React.FC<ScrollableItemProps> = ({
  onScrollEnter = () => undefined,
  onScrollLeave = () => undefined,
  children
}) => {
  const [isActive, setIsActive] = useState(false)
  const ref = createRef<HTMLDivElement>()
  const scrollPosition = useScrollPosition()
  const { height: windowHeight } = useWindowSize()

  useEffect(() => {
    if (!ref.current) {
      return
    }
    const elementBounding = ref.current.getBoundingClientRect()
    if (
      elementBounding.top < elementBounding.height / 2
      && elementBounding.top + windowHeight > elementBounding.height / 2
    ) {
      setIsActive(true)
    } else {
      setIsActive(false)
    }
  }, [scrollPosition, ref])

  // Manage callbacks calling
  useEffect(() => {
    if (isActive) {
      onScrollEnter()
    } else {
      onScrollLeave()
    }
  }, [isActive])

  return (
    <div ref={ref}>
      {children}
    </div>
  )
}

export default ScrollableItem