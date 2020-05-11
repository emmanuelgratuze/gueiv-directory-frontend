import React, { useMemo } from 'react'
import { Box } from 'grommet'

import { darken } from 'polished'
import { motion } from 'framer-motion'
import { ThemeColorsType } from 'themes/theme'
import useTheme from 'hooks/generic/useTheme'
import useHover from 'hooks/generic/useHover'

type DynamicBackgroundColorBoxProps = {
  color?: keyof ThemeColorsType;
  hoverColor?: keyof ThemeColorsType;
}

const DynamicBackgroundColorBox: React.FC<DynamicBackgroundColorBoxProps> = ({
  color,
  hoverColor,
  ...props
}) => {
  if (!color) {
    return <Box {...props} />
  }

  const [hoverRef, isHovered] = useHover()
  const { colors } = useTheme()
  const rawColors = useMemo(() => ({
    normal: colors[color] as string,
    hover: (hoverColor ? colors[hoverColor] : darken(0.05, colors[color] as string)) as string
  }), [color])

  return (
    <motion.div
      ref={hoverRef}
      animate={{ backgroundColor: isHovered ? rawColors.hover : rawColors.normal }}
      transition={{
        duration: 0.2
      }}
      {...props}
    />
  )
}

export default DynamicBackgroundColorBox
