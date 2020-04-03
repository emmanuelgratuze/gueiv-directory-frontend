// import { ImmutableMap } from '~/types/immutable'
import { Record } from 'immutable'
import { Criterion } from './criteria'

export interface Brand {
  id: string;
  name: string;
  slug?: string;
  description?: string;
  pictures?: string[];
  criteria: Criterion[];
  city?: string;
  country?: {
    id: string;
    name: string;
  };
  genders?: {
    id: string;
    name: string;
  }[];
  product_types?: {
    id: string;
    name: string;
  }[];
  facebook?: string;
  instagram?: string;
  web?: string;
}

export type ImmutableBrand = Record<Brand>

export {}
