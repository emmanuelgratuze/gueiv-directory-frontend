import { schema } from 'normalizr'

export const criterion = new schema.Entity('criteria', {})
export const brand = new schema.Entity('brands', {
  criteria: [criterion]
})
export const configuration = new schema.Entity('configuration', {})
export const country = new schema.Entity('countries', {})
export const productType = new schema.Entity('productTypes', {})

export default {}
