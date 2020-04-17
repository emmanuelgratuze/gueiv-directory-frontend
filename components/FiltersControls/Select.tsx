import React from 'react'
import { Box, BoxProps, Button } from 'grommet'
import { FormDown } from 'grommet-icons'
import styled, { css } from 'styled-components'
import { List } from 'immutable'

import Text from 'components/Text'
import useResponsive from 'hooks/useResponsive'

type SelectProps = {
  isOpen: boolean;
  selectedFilters: List<string>;
}

type IconProps = {
  reverse: boolean;
}
const Icon = styled(Box)`
  transition: transform 0.15s ease;
  ${(props: IconProps) => props.reverse && css`
    transform: rotate(180deg);
  `}
`

const Select: React.FC<BoxProps & SelectProps> = ({
  children,
  isOpen,
  selectedFilters,
  ...props
}) => {
  const color = isOpen ? ['yellow', 'light-yellow'] : ['blue', 'light-blue']
  const { isMobile } = useResponsive()
  return (
    <Button
      plain
      {...props}
    >
      {({ hover }: { hover: boolean }) => (
        <Box
          direction="row"
          align="center"
          justify="center"
          border={!isMobile ? { side: 'left', color: 'light-3' } : undefined}
          gap="small"
          pad={{
            horizontal: !isMobile ? 'medium' : 'medium',
            vertical: !isMobile ? undefined : 'medium'
          }}
          background="white"
        >
          {selectedFilters && (
            <Box
              background={{ color: color[hover ? 1 : 0] }}
              style={{ borderRadius: '1rem' }}
              width={{ min: '1rem' }}
              height="1rem"
              align="center"
              justify="center"
            >
              <Text size="xsmall" color="white">
                {selectedFilters.size}
              </Text>
            </Box>
          )}
          <Text
            color={color[hover ? 1 : 0]}
            weight="bold"
            nowrap
          >
            {children}
          </Text>
          <Icon reverse={isOpen}>
            <FormDown
              color={color[hover ? 1 : 0]}
              size="medium"
            />
          </Icon>
        </Box>
      )}
    </Button>
  )
}

export default Select
