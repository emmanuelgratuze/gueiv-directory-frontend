// import { ImmutableMap } from 'types/immutable'
import { Record } from 'immutable'

export interface ProductType {
  name: string;
}

export type ImmutableBrand = Record<ProductType>

export {}
