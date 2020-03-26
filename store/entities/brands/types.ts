// import { ImmutableMap } from '~/types/immutable'
import { Record } from 'immutable'
import { Criterion } from '../criteria/types'

export interface Brand {
  id: string;
  name: string;
  slug?: string;
  description?: string;
  pictures?: {
    id: string;
    name: string;
    ext: string;
    mime: string;
    size: number;
    url: string;
    createdAt: string;
    updatedAt: string;
  }[];
  criteria: Criterion[];
}

export type ImmutableBrand = Record<Brand>


export {}
