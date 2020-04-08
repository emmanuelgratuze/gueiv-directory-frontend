// import { ImmutableMap } from 'types/immutable'
import { Record, List } from 'immutable'
import { Country, ImmutableCountry } from './country'
import { Criterion, ImmutableCriterion } from './criterion'
import { ProductType, ImmutableProductType } from './productType'

type BrandBase = {
  id: string;
  name: string;
  slug: string;
  description?: string;
  city?: string;
  facebook?: string;
  instagram?: string;
  web?: string;
}

export interface Brand extends BrandBase {
  criteria: Criterion[];
  country?: Country;
  product_types?: ProductType[];
  pictures?: string[];
  genders?: string[];
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ImmutableBrand extends Record<BrandBase & {
    criteria: List<ImmutableCriterion>;
    country?: ImmutableCountry;
    product_types?: List<ImmutableProductType>;
    pictures?: List<string>;
    genders?: List<string>;
  }
> {}

export default {}
