import React from 'react'
import styled from 'styled-components'

import { IconProps } from 'grommet-icons'

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

export default Icon
