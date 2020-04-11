import { BrandColorsKeys } from 'themes/theme'
import { SET_BRANDS_COLORS, SET_MENU_OPEN_STATE } from './actionsTypes'
import { BasicAction } from '../types'

export const setBrandsColors = (brandsColors: { [key: string]: BrandColorsKeys }): BasicAction => ({
  type: SET_BRANDS_COLORS,
  payload: brandsColors
})

export const setMenuOpenState = (open: boolean): BasicAction => ({
  type: SET_MENU_OPEN_STATE,
  payload: open
})

export default {}
