import { schema } from 'normalizr'

export const criterion = new schema.Entity('criteria', {})
export const brand = new schema.Entity('brands', {
  criteria: [criterion]
})
export const configuration = new schema.Entity('configuration', {})

const schemas = {
  criterion,
  brand,
  configuration
}

export default schemas
