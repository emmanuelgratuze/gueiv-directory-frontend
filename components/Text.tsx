import { Text } from 'grommet'
import styled, { css } from 'styled-components'

export type StyledTextProps = {
  sup?: boolean;
  sub?: boolean;
  transform?: 'initial' | 'uppercase' | 'lowercase' | 'capitalize';
  underlined?: boolean;
  spacing?: 'normal' | 'large';
  italic?: boolean;
  font?: 'Quicksand' | 'Lato';
  nowrap?: boolean;
}

export const textStyles = css`
  transition: color 0.2s ease-out;

  /* Sub and sup */
  ${(props: StyledTextProps) => props.sup
    && css`
      position: relative;
      top: -0.5em;
    `}
  ${(props: StyledTextProps) => props.sub
    && css`
      position: relative;
      top: 0.5em;
    `}

  /* Transform */
  ${(props: StyledTextProps) => props.transform === 'initial'
    && css`
      /* Uses important because it needs to disable another instruction */
      text-transform: initial !important;
    `}
  ${(props: StyledTextProps) => props.transform === 'uppercase'
    && css`
      text-transform: uppercase;
    `}
  ${(props: StyledTextProps) => props.transform === 'lowercase'
    && css`
      text-transform: lowercase;
    `}
  ${props => props.transform === 'capitalize'
    && css`
      text-transform: capitalize;
    `}

  /* Underline */
  ${(props: StyledTextProps) => props.underlined
    && css`
      text-decoration: underline;
    `}

  ${(props: StyledTextProps) => props.spacing === 'large'
    && css`
      letter-spacing: .2em;
    `}
  ${(props: StyledTextProps) => props.spacing === 'normal'
    && css`
      letter-spacing: .1em;
    `}

  ${(props: StyledTextProps) => props.italic
    && css`
      font-style: italic;
    `}

  ${(props: StyledTextProps) => props.nowrap
    && css`
      white-space: nowrap;
    `}

  ${(props: StyledTextProps) => props.font
    && css`
      font-family: ${props.font === 'Lato' ? 'Lato' : 'inherit'}, Helvetica, sans-serif;
      font-family: ${props.font === 'Quicksand' ? 'Quicksand' : 'inherit'}, Helvetica, sans-serif;
    `}
`

const StyledText = styled(Text)`
  ${textStyles}
`

export default StyledText
