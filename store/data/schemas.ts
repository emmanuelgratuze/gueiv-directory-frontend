import { schema } from 'normalizr'

export const criterion = new schema.Entity('criteria', {})
export const configuration = new schema.Entity('configuration', {})
export const country = new schema.Entity('countries', {})
export const gender = new schema.Entity('genders', {})
export const productType = new schema.Entity('productTypes', {})
export const brand = new schema.Entity('brands', {
  criteria: [criterion],
  country,
  genders: [gender],
  productTypes: [productType]
})

export default {}
