// import { ImmutableMap } from 'types/immutable'
import { Record } from 'immutable'

export interface Country {
  name: string;
}

export type ImmutableBrand = Record<Country>

export {}