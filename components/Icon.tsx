import React from 'react'
import styled from 'styled-components'

import { IconProps } from 'grommet-icons'
import { BoxProps } from 'grommet'

const StyledWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    transition: fill 0.1s ease-out, stroke 0.1s ease-out;
  }
`

type CustomIconProps = {
  Component: React.ComponentType<IconProps & React.SVGProps<SVGSVGElement>>;
}

const Icon: React.FC<IconProps & React.SVGProps<SVGSVGElement> & CustomIconProps> = ({
  Component,
  ...props
}) => (
  <StyledWrapper>
    <Component {...props} />
  </StyledWrapper>
)

// Version accepting Box type components
type CustomBoxIconProps = {
  Component: React.ComponentType<BoxProps>;
}

export const BoxIcon: React.FC<BoxProps & CustomBoxIconProps & React.HTMLAttributes<HTMLDivElement>> = ({
  Component,
  ...props
}) => (
  <StyledWrapper>
    <Component {...props} />
  </StyledWrapper>
)

export default Icon
