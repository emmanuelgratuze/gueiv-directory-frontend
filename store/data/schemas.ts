import { schema } from 'normalizr'

export const criterion = new schema.Entity('criteria', {})
export const brand = new schema.Entity('brands', {
  criteria: [criterion]
})

const schemas = {
  criterion,
  brand
}

export default schemas
