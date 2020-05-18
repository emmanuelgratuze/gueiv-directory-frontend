import React, { useEffect, useState } from 'react'
import { Box } from 'grommet'
import styled, { keyframes, Keyframes } from 'styled-components'

import useTheme from 'hooks/generic/useTheme'

const scaleKeyframes = keyframes`
  0% { transform: scaleX(1) scaleY(1); }
  20% { transform: scaleX(1.4) scaleY(1.4); }
  60% { transform: scaleX(1) scaleY(1); }
  100% { transform: scaleX(1) scaleY(1); }
`

const backgroundKeyframes = (colors: string[]): Keyframes => (
  keyframes`
    0% { background-color: ${colors[0]}; }
    25% { background-color: ${colors[1]}; }
    50% { background-color: ${colors[2]}; }
    75% { background-color: ${colors[3]}; }
    100% { background-color: ${colors[0]}; }
  `
)

type PointProps = {
  delay: string;
  colors: string[];
}
const Point = styled.div<PointProps>`
  width: 10px;
  height: 10px;
  border-radius: 10px;
  animation:
    1.3s ${scaleKeyframes} ${props => props.delay || '0s'} ease-in-out infinite,
    2.6s ${(props) => backgroundKeyframes(props.colors)} 0s linear infinite;
`

type LoaderProps = {
  color?: string;
}

const Loader: React.FC<LoaderProps> = ({ color }) => {
  const { colors } = useTheme()
  const [realColors, setRealColors] = useState<string[]>()

  useEffect(() => {
    const pointsColors = color ? new Array(4).fill(color) : ['blue', 'pink', 'turquoise', 'yellow']
    setRealColors(pointsColors.map((c) => colors[c]))
  }, [color])

  return (
    <Box
      direction="row"
      justify="between"
      align="center"
      width="3rem"
    >
      {realColors && (
        <>
          <Point
            delay="0.33s"
            colors={realColors}
          />
          <Point
            delay="0.66s"
            colors={realColors}
          />
          <Point
            delay="1s"
            colors={realColors}
          />
        </>
      )}
    </Box>
  )
}

export default Loader
