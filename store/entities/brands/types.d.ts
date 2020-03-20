import { ImmutableMap } from '~/types/immutable.d'

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

export type ImmutableBrand = ImmutableMap<Brand>

export interface AppEntities {
  brands: {
    [key: string]: Brand;
  };
}
