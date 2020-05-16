import React, { useEffect, useState } from 'react'
import { Box, BoxProps } from 'grommet'
import { motion, MotionProps } from 'framer-motion'

import useTheme from 'hooks/generic/useTheme'

type LoaderProps = {
  color?: string;
  onColorChange?: Function;
}

const Point = motion.custom(Box)
const LoaderPoint: React.FC<MotionProps & BoxProps & LoaderProps> = ({ color, transition, animate }) => (
  <Point
    round="100%"
    pad={{ left: '25%', bottom: '25%' }}
    background={{ color }}
    transition={transition}
    animate={animate}
  />
)

const animationDuration = 0.5
const pointColors = ['blue', 'pink', 'turquoise', 'yellow']

const Loader: React.FC<BoxProps & LoaderProps> = ({
  color = 'yellow',
  onColorChange,
  ...props
}) => {
  const { colors } = useTheme()
  const [colorIndex, setColorIndex] = useState(0)
  useEffect(() => {
    const animTimeout = setTimeout(() => {
      const newIndex = (colorIndex + 1) % pointColors.length
      setColorIndex(newIndex)
      if (onColorChange) {
        onColorChange(pointColors[newIndex])
      }
    }, animationDuration * 1000)
    return () => clearInterval(animTimeout)
  }, [colorIndex])

  return (
    <Box
      width="100%"
      direction="row"
      gap="13%"
      style={{ maxWidth: '10rem' }}
      {...props}
    >
      <LoaderPoint
        color={color}
        animate={{
          scale: [0.5, 0.9],
          backgroundColor: colors[pointColors[colorIndex]]
        }}
        transition={{
          yoyo: Infinity,
          duration: animationDuration,
          ease: 'easeInOut'
        }}
      />
      <LoaderPoint
        color={color}
        animate={{
          scale: [0.5, 0.9],
          backgroundColor: colors[pointColors[colorIndex]]
        }}
        transition={{
          yoyo: Infinity,
          duration: animationDuration,
          ease: 'easeInOut',
          delay: 0.25 * animationDuration
        }}
      />
      <LoaderPoint
        color={color}
        animate={{
          scale: [0.5, 0.9],
          backgroundColor: colors[pointColors[colorIndex]]
        }}
        transition={{
          yoyo: Infinity,
          duration: animationDuration,
          ease: 'easeInOut',
          delay: 0.5 * animationDuration
        }}
      />
    </Box>
  )
}

export default Loader
