// import { ImmutableMap } from 'types/immutable'
import { Record } from 'immutable'

export interface ProductType {
  id: string;
  name: string;
}

export type ImmutableProductType = Record<ProductType>

export {}
