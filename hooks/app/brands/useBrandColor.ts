import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import useTheme from 'hooks/generic/useTheme'
import { selectBrandsColors } from 'store/interface/selectors'
import { ImmutableBrand } from 'types/data/brand'
import { BrandColorsKeys } from 'themes/theme'

const useBrandColor = (brand: ImmutableBrand): [string, string] => {
  const brandsColors = useSelector(selectBrandsColors)
  const { brandColors, oppositeColors } = useTheme()
  const brandColorName = useMemo(() => {
    if (!brand) {
      return null
    }
    let colorName = brandsColors.get(brand.get('id'))
    if (!colorName) {
      const colorsNames = Object.keys(brandColors) as [BrandColorsKeys]
      colorName = colorsNames[Math.floor(Math.random() * colorsNames.length)]
    }
    return colorName
  }, [brand, brandsColors])

  return [
    brandColorName ? brandColors[brandColorName] : 'transparent',
    brandColorName ? oppositeColors[brandColorName] : 'transparent'
  ]
}

export default useBrandColor
