import { Record } from 'immutable'
import { BrandColorsKeys } from 'themes/theme'

export interface InterfaceTree {
  brandsColors: { [key: string]: BrandColorsKeys };
}

export type ImmutableInterfaceTree = Record<Interface>

export {}
