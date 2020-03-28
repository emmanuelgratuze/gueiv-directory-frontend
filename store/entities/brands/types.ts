// import { ImmutableMap } from '~/types/immutable'
import { Record, List, Map } from 'immutable'
import { Criterion } from '../criteria/types'

export interface BrandPicture {
  id: string;
  name: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  createdAt: string;
  updatedAt: string;
}
export interface Brand {
  id: string;
  name: string;
  slug?: string;
  description?: string;
  pictures?: BrandPicture[];
  criteria: Criterion[];
}

export type ImmutableBrand = Record<Omit<Brand, 'pictures'>> & Record<{
  pictures?: List<BrandPicture>;
}>

export type BrandsStateTree = Map<string, ImmutableBrand>

export {}
