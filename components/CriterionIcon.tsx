import React, { useMemo } from 'react'
import { Box, Stack } from 'grommet'
import styled from 'styled-components'
import { darken } from 'polished'

import CriterionTooltip from 'components/CriterionTooltip'

import { ImmutableCriterion } from 'types/data/criterion'
import { ColorsNames } from 'themes/theme'
import useTheme from 'hooks/generic/useTheme'
import useHover from 'hooks/generic/useHover'
import Link from 'next/link'
import { AnimatePresence } from 'framer-motion'

type CriterionIcon = {
  criterion: ImmutableCriterion;
  color?: ColorsNames | string;
  clickable?: boolean;
}

const StyledIconContainer = styled(Box)`
  svg {
    width: 100%;
    height: 100%;
  }

  svg,
  g,
  path {
    fill: ${(props) => props.color} !important;
    pointer-events: none;
  }

  path {
    transition: fill 0.1s ease-out;
  }
`

const CriterionIcon: React.FC<CriterionIcon> = ({
  criterion,
  color = 'white',
  clickable = false,
  ...props
}) => {
  const [ref, isHover] = useHover()
  const { colors, oppositeColors } = useTheme()
  if (!criterion.get('icon')) {
    return null
  }

  const oppositeColor = useMemo(() => {
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
    <Box fill overflow="hidden">
      <StyledIconContainer
        fill
        align="center"
        justify="center"
        dangerouslySetInnerHTML={{
          __html: criterion.get('iconContent')
        }}
        color={isHover && clickable ? oppositeColor : normalColor}
        {...props}
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
      >
        <Link href="/criterios" as={`/criterios#${criterion.get('id')}`}>
          <Box ref={ref}>
            <Stack fill>
              {content}
            </Stack>
          </Box>
        </Link>
        <AnimatePresence>
          {isHover && (
            <CriterionTooltip
              criterion={criterion}
              color={color}
            />
          )}
        </AnimatePresence>
      </Box>
    )
  }
  return content
}

export default CriterionIcon
