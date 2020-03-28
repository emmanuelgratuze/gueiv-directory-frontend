import { schema } from 'normalizr'

export const criterion = new schema.Entity('criteria', {})
export const brand = new schema.Entity('brands', {
  criteria: [criterion]
})

export default {
  criterion,
  brand
}
