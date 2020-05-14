// import React from 'react'
import { Button as GrommetButton, ButtonProps as GrommetButtonProps } from 'grommet'
import styled, { css } from 'styled-components'
import { ThemeType, ColorsNames } from 'themes/theme'
import { ColorType } from 'grommet/utils'

// type BoxPropsWithoutColor = Omit<BoxProps, 'color'>
type ButtonProps = {
  theme: ThemeType;
  size?: 'small' | 'medium' | 'large';
  color?: ColorsNames;
  hoverColor?: ColorsNames;
}

const getHoverOppositeColor = (props: ButtonProps): ColorType => (
  props.hoverColor
    ? props.theme.global.oppositeColors[props.hoverColor]
    : props.theme.global.colors[props.color || 'gray']
)
const getOppositeColor = (props: ButtonProps): ColorType => (
  props.theme.global.colors[props.hoverColor || props.theme.global.oppositeColors[props.color || 'gray']]
)

const Button = styled(GrommetButton)<ButtonProps & GrommetButtonProps>`
  padding: 0.8em 2em;
  color: ${(props: ButtonProps) => props.theme.global.colors[props.theme.global.oppositeColors[props.color || 'gray']]};
  font-weight: 600;
  font-size: 0.8em;
  text-align: center;
  text-transform: uppercase;
  text-decoration: none;
  background-color: ${(props: ButtonProps) => props.theme.global.colors[props.color || 'gray']};
  border: none;
  border-radius: 2rem;
  outline: none;
  cursor: pointer;
  transition: background-color 0.2s ease-out;
  ${(props: ButtonProps) => props.size === 'small' && css`
    font-size: 0.8em;
    padding: 0.5em 1.8em;
  `}
  appearance: none;
  ${(props: ButtonProps) => props.size === 'large' && css`
    font-size: 1.1em;
    padding: 0.7em 2.2em;
  `}
  &:hover {
    color: ${getHoverOppositeColor};
    background-color: ${getOppositeColor};
  }
`

export default Button
