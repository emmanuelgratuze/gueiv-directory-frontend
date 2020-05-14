import React from 'react'
import { Box, BoxProps } from 'grommet'
import { motion, MotionProps } from 'framer-motion'

type LoaderProps = {
  color?: string;
}

const Point = motion.custom(Box)
const LoaderPoint: React.FC<MotionProps & BoxProps & LoaderProps> = ({ color, transition }) => (
  <Point
    initial={{ scale: 0.7 }}
    animate={{ scale: 0.9 }}
    round="1rem"
    width="1rem"
    height="1rem"
    background={{ color }}
    transition={transition}
  />
)

const Loader: React.FC<BoxProps & LoaderProps> = ({
  color = 'yellow',
  ...props
}) => (
  <Box
    {...props}
    direction="row"
    gap="small"
  >
    <LoaderPoint
      color={color}
      transition={{
        yoyo: Infinity,
        duration: 0.5,
        ease: 'easeInOut'
      }}
    />
    <LoaderPoint
      color={color}
      transition={{
        yoyo: Infinity,
        duration: 0.5,
        ease: 'easeInOut',
        delay: 0.3
      }}
    />
    <LoaderPoint
      color={color}
      transition={{
        yoyo: Infinity,
        duration: 0.5,
        ease: 'easeInOut',
        delay: 0.6
      }}
    />
  </Box>
)

export default Loader
