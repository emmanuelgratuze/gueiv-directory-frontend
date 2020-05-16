import React, { useMemo } from 'react'
import { Box, BoxProps } from 'grommet'
import styled from 'styled-components'
import { darken } from 'polished'
import { AnimatePresence } from 'framer-motion'
import Link from 'next/link'

import CriterionTooltip from 'components/CriterionTooltip'

import { ImmutableCriterion } from 'types/data/criterion'
import { ColorsNames } from 'themes/theme'
import useTheme from 'hooks/generic/useTheme'
import useHover from 'hooks/generic/useHover'
import A from './A'

type CriterionIcon = {
  criterion: ImmutableCriterion;
  color?: ColorsNames | string;
  hoverColor?: ColorsNames | string;
  clickable?: boolean;
  tooltipPosition?: 'top' | 'bottom';
}

const StyledIconContainer = styled(Box)`
  svg {
    width: 100%;
    height: 100%;
  }

  svg,
  g,
  path {
    pointer-events: none;
    fill: ${(props) => props.color} !important;
  }

  path {
    transition: fill 0.1s ease-out;
  }
`

const CriterionIcon: React.FC<React.HTMLProps<HTMLDivElement> & BoxProps & CriterionIcon> = ({
  criterion,
  color = 'white',
  hoverColor,
  clickable = false,
  tooltipPosition,
  ...props
}) => {
  const [ref, isHover] = useHover()
  const { colors, oppositeColors } = useTheme()
  if (!criterion.get('icon')) {
    return null
  }

  const oppositeColor = useMemo(() => {
    if (hoverColor) {
      return colors[hoverColor]
    }
    if ((color as ColorsNames) in colors) {
      return colors[oppositeColors[color as ColorsNames]]
    }
    return darken(0.5, color)
  }, [color])

  const normalColor = useMemo(() => {
    if ((color as ColorsNames) in colors) {
      return colors[color as ColorsNames] as string
    }
    return color
  }, [color])

  const content = (
    <Box
      fill
      overflow="hidden"
      {...props}
    >
      <StyledIconContainer
        fill
        align="center"
        justify="center"
        dangerouslySetInnerHTML={{
          __html: criterion.get('iconContent')
        }}
        color={isHover && clickable ? oppositeColor : normalColor}
      />
    </Box>
  )

  if (clickable) {
    return (
      <Box
        fill
        style={{ position: 'relative' }}
        align="center"
        justify="center"
        ref={ref}
      >
        <Link href="/criterios" as={`/criterios#${criterion.get('id')}`} passHref>
          <A
            style={{
              height: '100%',
              width: '100%'
            }}
          >
            {content}
          </A>
        </Link>
        <AnimatePresence>
          {isHover && (
            <CriterionTooltip
              criterion={criterion}
              color={color}
              position={tooltipPosition}
            />
          )}
        </AnimatePresence>
      </Box>
    )
  }
  return content
}

export default CriterionIcon
