// import { ImmutableMap } from 'types/immutable'
import { Record, List } from 'immutable'
import { Country, ImmutableCountry } from './country'
import { Criterion, ImmutableCriterion } from './criterion'
import { ProductType, ImmutableProductType } from './productType'
import { Gender, ImmutableGender } from './gender'

type BrandBase = {
  id: string;
  name: string;
  slug: string;
  description?: string;
  city?: string;
  facebook?: string;
  instagram?: string;
  website?: string;
}

export interface Brand extends BrandBase {
  criteria: Criterion[];
  country?: Country;
  productTypes?: ProductType[];
  pictures?: string[];
  genders?: Gender[];
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ImmutableBrand extends Record<BrandBase & {
    criteria: List<ImmutableCriterion>;
    country?: ImmutableCountry;
    productTypes?: List<ImmutableProductType>;
    pictures?: List<string>;
    genders?: List<ImmutableGender>;
  }
> {}

export default {}
