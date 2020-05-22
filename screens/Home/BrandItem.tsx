import React, { useEffect, useState } from 'react'
import { Box, Button, BoxProps } from 'grommet'
import styled from 'styled-components'

import { ImmutableBrand } from 'types/data/brand'
import { ThemeColorsType } from 'themes/theme'
import useBrowser from 'hooks/generic/useBrowser'
import BrandPreview from 'components/BrandPreview'

type BrandItemType = {
  brand: ImmutableBrand;
  color?: keyof ThemeColorsType;
  onLoad?: Function;
  hidden?: boolean;
  displayDelay?: number;
}

type WrapperProps = {
  displayDelay: number;
}
const Wrapper = styled(Box)<WrapperProps>`
  transform: translate3d(0, 0, 0);
  transition: 0.5s opacity ${(props) => props.displayDelay}s ease-out;
`

const BrandItem: React.FC<BoxProps & JSX.IntrinsicElements['div'] &BrandItemType> = ({
  brand,
  color,
  onLoad,
  hidden,
  displayDelay = 0,
  ...props
}) => {
  const { isServerSide } = useBrowser()
  // Make it visible on server
  const [isVisible, setIsVisible] = useState(isServerSide)

  useEffect(() => {
    if (!hidden) {
      setIsVisible(true)
    }
  }, [])

  return (
    <Wrapper
      style={{
        opacity: isVisible ? 1 : 0
      }}
      displayDelay={displayDelay}
      {...props}
    >
      <Button as="div" plain>
        <Box
          pad="0.4rem"
          fill
        >
          <BrandPreview
            key={brand.get('id')}
            brand={brand}
            color={color}
            onLoad={onLoad}
          />
        </Box>
      </Button>
    </Wrapper>
  )
}

export default BrandItem
