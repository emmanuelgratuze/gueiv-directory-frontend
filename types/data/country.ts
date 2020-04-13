// import { ImmutableMap } from 'types/immutable'
import { Record } from 'immutable'

export interface Country {
  id: string;
  name: string;
}

export type ImmutableCountry = Record<Country>

export {}
