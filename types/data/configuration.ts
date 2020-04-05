// import { ImmutableMap } from 'types/immutable'
import { Record } from 'immutable'

export interface Configuration {
  title: string;
  description: string;
  facebook: string;
  instagram: string;
  email: string;
}

export type ImmutableConfiguration = Record<Configuration>

export {}
