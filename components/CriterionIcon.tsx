import React from 'react'
import { BoxProps, Box } from 'grommet'
import styled from 'styled-components'

import { ImmutableCriterion } from 'types/data/criterion'
import { ColorsType } from 'themes/theme'

interface CriterionIcon {
  criterion: ImmutableCriterion;
  color?: keyof ColorsType;
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

const CriterionIcon: React.FC<BoxProps & CriterionIcon> = ({
  criterion,
  color = 'white',
  ...props
}) => {
  if (!criterion.get('icon')) {
    return null
  }

  return (
    <StyledIconContainer
      dangerouslySetInnerHTML={{
        __html: criterion.get('iconContent')
      }}
      color={color}
      {...props}
    />
  )
}

export default CriterionIcon
