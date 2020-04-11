// import React from 'react'
// import { Box, BoxProps } from 'grommet'
import styled, { css } from 'styled-components'
import { ThemeType, ColorsNames } from 'themes/theme'

// type BoxPropsWithoutColor = Omit<BoxProps, 'color'>
type ButtonProps = {
  theme: ThemeType;
  size?: 'small' | 'medium' | 'large';
  color?: ColorsNames;
}

const Button = styled.div<ButtonProps>`
  padding: 0.8em 2em;
  color: ${(props: ButtonProps) => props.theme.global.colors[props.theme.global.oppositeColors[props.color || 'gray']]};
  font-weight: 600;
  font-size: 0.8em;
  text-transform: uppercase;
  text-decoration: none;
  background-color: ${(props: ButtonProps) => props.theme.global.colors[props.color || 'gray']};
  border-radius: 2rem;
  cursor: pointer;
  transition: background-color 0.2s ease-out;
  ${(props: ButtonProps) => props.size === 'small' && css`
    font-size: 0.8em;
    padding: 0.5em 1.8em;
  `}
  ${(props: ButtonProps) => props.size === 'large' && css`
    font-size: 1.1em;
    padding: 0.7em 2.2em;
  `}
  &:hover {
    color: ${(props: ButtonProps) => props.theme.global.colors[props.color || 'gray']};
    background-color: ${(props: ButtonProps) => props.theme.global.colors[props.theme.global.oppositeColors[props.color || 'gray']]};
  }
`

export default Button
