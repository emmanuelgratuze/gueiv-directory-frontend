import React, { useMemo } from 'react'
import { Box } from 'grommet'
import styled from 'styled-components'
import { darken } from 'polished'

import { ImmutableCriterion } from 'types/data/criterion'
import { ColorsNames } from 'themes/theme'
import useTheme from 'hooks/useTheme'
import useHover from 'hooks/useHover'

type CriterionIcon = {
  criterion: ImmutableCriterion;
  color?: ColorsNames | string;
  tooltip?: boolean;
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
  }
`

const CriterionIcon: React.FC<CriterionIcon> = ({
  criterion,
  color = 'white',
  tooltip = false,
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

  return (
    <Box ref={ref}>
      <StyledIconContainer
        dangerouslySetInnerHTML={{
          __html: criterion.get('iconContent')
        }}
        color={isHover && tooltip ? oppositeColor : normalColor}
        {...props}
      />
    </Box>
  )
}

export default CriterionIcon
