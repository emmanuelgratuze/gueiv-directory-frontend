import React from 'react'
import { TextInput, TextInputProps } from 'grommet'
import { FormSearch } from 'grommet-icons'
import styled from 'styled-components'

import { ThemeType } from 'themes/theme'

type SearchInputType = {
  theme: ThemeType;
}

const StyledTextInput = styled(TextInput)`
  padding-left: 5px;
  font-family: 'QuickSand', Helvetica, sans-serif;
  text-align: left;
  border: none !important;

  &,
  &:focus {
    color: ${(props: TextInputProps & SearchInputType) => props.theme.global.colors.blue};
    font-weight: bold;
  }

  &:focus {
    border: none !important;
  }
`

const SearchInput: React.FC<TextInputProps> = (props) => (
  <>
    <FormSearch color="blue" />
    <StyledTextInput
      type="search"
      plain
      {...props}
    />
  </>
)


export default SearchInput
