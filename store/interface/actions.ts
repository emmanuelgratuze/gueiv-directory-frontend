import {
  SET_BRANDS_COLORS,
  SetBrandsColors
} from './types'
import { BrandColorsKeys } from '~/themes/theme'

export const setBrandsColors = (brandsColors: { [key: string]: BrandColorsKeys }): SetBrandsColors => ({
  type: SET_BRANDS_COLORS,
  payload: brandsColors
})

export default {}
