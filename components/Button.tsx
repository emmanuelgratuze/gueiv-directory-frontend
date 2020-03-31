import { Box, BoxProps } from 'grommet'
import styled, { css } from 'styled-components'
import { ThemeType } from '~/themes/theme'

type ButtonProps = {
  theme: ThemeType;
  size?: 'small' | 'medium' | 'large';
}

const Button = styled<React.FC<BoxProps & ButtonProps>>(Box)`
  padding: 0.6em 2em;
  color: white;
  font-weight: bold;
  font-size: 0.9em;
  text-transform: uppercase;
  background-color: ${(props: ButtonProps) => props.theme.global.colors.gray};
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
    background-color: ${(props: ButtonProps) => props.theme.global.colors.blue};
  }
`

export default Button
