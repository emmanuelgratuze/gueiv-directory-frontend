// import { ImmutableMap } from 'types/immutable'
import { Record } from 'immutable'

export interface Gender {
  id: string;
  name: string;
}

export type ImmutableGender = Record<Gender>

export {}
