import React from 'react'
import styled from 'styled-components'
import { Paragraph as GrommetParagraph, ParagraphProps } from 'grommet'
import { truncate } from 'lodash'

import { textStyles, StyledTextProps } from './Text'

const StyledParagraph = styled(GrommetParagraph)`
  ${textStyles}
`

interface Heading {
  length?: number;
}

const Paragraph: React.FC<Heading & StyledTextProps & ParagraphProps> = ({
  length,
  children,
  ...props
}) => (
  <StyledParagraph {...props}>
    {typeof length !== 'undefined' && typeof children === 'string' ? (
      truncate(children, { length, separator: ' ' })
    ) : children}
  </StyledParagraph>
)

export default Paragraph
