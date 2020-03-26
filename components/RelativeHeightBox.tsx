import React from 'react'
import { Box, BoxProps } from 'grommet'
import styled from 'styled-components'

type RelativeHeightType = {
  relativeHeight: string | undefined;
}

const OuterBox = styled(Box)`
  position: relative;
`

const InnerBox = styled(Box)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`

const RelativeHeightBox: React.FC<BoxProps & RelativeHeightType> = ({
  relativeHeight,
  children,
  ...props
}) => (
  <OuterBox
    pad={{ bottom: relativeHeight }}
    {...props}
  >
    <InnerBox>
      {children}
    </InnerBox>
  </OuterBox>
)

export default RelativeHeightBox
