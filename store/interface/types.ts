import { Record } from 'immutable'
import { BrandColorsKeys } from '~/themes/theme'

export interface Interface {
  brandsColors: { [key: string]: string };
}

export const SET_BRANDS_COLORS = 'interface/SET_BRANDS_COLORS'

export interface SetBrandsColors {
  type: typeof SET_BRANDS_COLORS;
  payload: { [key: string]: BrandColorsKeys };
}

export type InterfaceStateTree = Record<Interface>

export {}
