import { useMemo } from 'react'
import useTheme from 'hooks/useTheme'
import useSelector from 'hooks/useSelector'
import { selectBrandsColors } from 'store/interface/selectors'
import { Brand } from 'types/data/brand'
import { BrandColorsKeys } from 'themes/theme'

const useBrandColor = (brand: Brand): [string, string] => {
  const brandsColors = useSelector(selectBrandsColors) as { [key: string]: BrandColorsKeys }
  const { brandColors, oppositeColors } = useTheme()
  const brandColorName = useMemo(() => {
    if (!brand) {
      return null
    }
    let colorName = brandsColors[brand.id]
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
