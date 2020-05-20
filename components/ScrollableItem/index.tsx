import React, {
  useEffect,
  useState,
  createRef,
  useMemo
} from 'react'
import useScrollPosition from 'hooks/generic/useScrollPosition'
import useResponsive from 'hooks/generic/useResponsive'

type ScrollableItemProps = {
  onScrollEnter?: Function;
  onScrollLeave?: Function;
  detectionPadding?: number;
}

const ScrollableItem: React.FC<ScrollableItemProps & JSX.IntrinsicElements['div']> = ({
  onScrollEnter = () => undefined,
  onScrollLeave = () => undefined,
  detectionPadding = 0,
  children,
  ...props
}) => {
  const [isActive, setIsActive] = useState(false)
  const ref = createRef<HTMLDivElement>()
  const scrollPosition = useScrollPosition()
  const { isMobile } = useResponsive()

  useEffect(() => {
    if (!ref.current) {
      return
    }
    const elementBounding = ref.current.getBoundingClientRect()
    const detectionPosition = isMobile ? elementBounding.height * 2 / 3 : elementBounding.height / 2
    if (
      elementBounding.top - detectionPadding < detectionPosition
      && elementBounding.top + detectionPadding + elementBounding.height > detectionPosition
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

  return useMemo(() => (
    <div ref={ref} {...props}>
      {children}
    </div>
  ), [children, ref])
}

export default ScrollableItem
