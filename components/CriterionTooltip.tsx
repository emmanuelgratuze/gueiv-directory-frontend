import React from 'react'
import { Box } from 'grommet'
import styled, { css } from 'styled-components'

import Text from 'components/Text'

import { ImmutableCriterion } from 'types/data/criterion'
import { ColorsNames } from 'themes/theme'
import { motion } from 'framer-motion'

type Props = {
  position?: 'top' | 'bottom';
}

type CriterionTooltip = {
  criterion: ImmutableCriterion;
  color?: ColorsNames | string;
  position?: 'top' | 'bottom';
}

const StyledBox = styled(Box)`
  position: absolute;
  bottom: 130%;
  z-index: 20;
  max-width: none;
  pointer-events: none;
  ${(props: Props) => props.position === 'bottom' && css`
    bottom: auto;
    top: 230%;
  `}
`

const TooltipWrapper = motion.custom(StyledBox)

const CriterionTooltip: React.FC<CriterionTooltip> = ({
  criterion,
  position = 'top'
}) => (
  <Box align="center">
    <TooltipWrapper
      initial={{ opacity: 0, transform: 'scale(1, 1, 1)' }}
      animate={{ opacity: 1, transform: 'scale(1, 1, 1)' }}
      exit={{ opacity: 0, transform: 'scale(1, 1, 1)' }}
      transition={{ duration: 0.15 }}
      width="small"
      pad="small"
      background={{ color: 'dark-gray' }}
      align="center"
      justify="center"
      round="0.5rem"
      position={position}
    >
      <Text
        font="Lato"
        transform="uppercase"
        weight="bold"
        size="small"
        textAlign="center"
        color="white"
      >
        {criterion.get('name')}
      </Text>
    </TooltipWrapper>
  </Box>
)

export default CriterionTooltip
