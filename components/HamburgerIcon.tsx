import React from 'react'
import styled, { css } from 'styled-components'
import useTheme from 'hooks/useTheme'


type HamburgerIconProps = {
  open?: boolean;
}

type LineProps = HamburgerIconProps & {
  color?: string;
}

const Lines = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 1.5rem;
  height: 1.5rem;

  > div {
    left: 0;
    width: 100%;
    height: 4px;
    margin: auto;
    background-color: ${(props: LineProps) => props.color || 'black'};
    border-radius: 8px;
    transform-origin: left;
    transition-timing-function: ease;
    transition-duration: 0.2s;
    transition-property: transform, opacity;
  }

  ${(props: LineProps) => props.open && css`
    > div{
      &:not(:first-child):not(:last-child) {
        opacity: 0;
        transform: translate3d(-20%, 0, 0)
      }
      &:first-child {
        transform: translate3d(20%, 0, 0) rotate3d(0, 0, 1, 45deg) translate3d(-2%, 0, 0);
      }
      &:last-child {
        transform: translate3d(20%, 0, 0) rotate3d(0, 0, 1, -45deg) translate3d(-2%, 0, 0);
      }
    }
  `}
`

const HamburgerIcon: React.FC<HamburgerIconProps> = ({
  open = false,
  ...props
}) => {
  const { colors } = useTheme()
  return (
    <Lines
      open={open}
      color={colors.gray}
      {...props}
    >
      <div />
      <div />
      <div />
    </Lines>
  )
}

export default HamburgerIcon
