// import { ImmutableMap } from '~/types/immutable'
import { Record } from 'immutable'

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
}

export type ImmutableBrand = Record<Brand>

export interface AppEntities {
  brands: {
    [key: string]: Brand;
  };
}
