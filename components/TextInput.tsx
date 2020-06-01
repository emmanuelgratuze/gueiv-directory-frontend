// import React from 'react'
import {
  TextInput as GrommetTextInput,
  TextInputProps as GrommetTextInputProps
} from 'grommet'
import styled, { css } from 'styled-components'
import { ThemeType, ColorsNames } from 'themes/theme'

// type BoxPropsWithoutColor = Omit<BoxProps, 'color'>
type TextInputProps = {
  theme: ThemeType;
  fontSize?: 'small' | 'medium' | 'large';
  color?: ColorsNames;
  backgroundColor?: ColorsNames;
  placeholderColor?: ColorsNames;
}

// const getHoverOppositeColor = (props: TextInputProps): ColorType => (
//   props.hoverColor
//     ? props.theme.global.oppositeColors[props.hoverColor]
//     : props.theme.global.colors[props.color || 'gray']
// )
// const getOppositeColor = (props: TextInputProps): ColorType => (
//   props.theme.global.colors[props.hoverColor || props.theme.global.oppositeColors[props.color || 'gray']]
// )

const TextInput = styled(GrommetTextInput)<GrommetTextInputProps & TextInputProps>`
  max-width: 1000px;
  margin: 10px 0;
  background-color: transparent;
  border: none;
  ${(props: TextInputProps) => props.backgroundColor && css`
    background-color: ${props.theme.global.colors[props.backgroundColor || 'white']};
  `}

  ${(props: TextInputProps) => props.color && css`
    color: ${props.theme.global.colors[props.color || 'gray']} !important;
  `}

  ${(props: TextInputProps) => props.fontSize === 'small' && css`
    font-size: 0.9em;
  `}

  ${(props: TextInputProps) => props.placeholderColor && css`
    ::placeholder,
    ::-webkit-input-placeholder {
      color: ${props.theme.global.colors[props.placeholderColor || 'gray']};
    }
    :-ms-input-placeholder {
      color: ${props.theme.global.colors[props.placeholderColor || 'gray']};
    }
  `}
`

export default TextInput
