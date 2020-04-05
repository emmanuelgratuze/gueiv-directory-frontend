import { Record } from 'immutable'
import { BrandColorsKeys } from 'themes/theme'

export interface Interface {
  brandsColors: { [key: string]: BrandColorsKeys };
}

export type InterfaceTree = Record<Interface>

export {}
