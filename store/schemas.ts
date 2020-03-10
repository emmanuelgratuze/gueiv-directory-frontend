import { schema } from 'normalizr';

export const certification = new schema.Entity('certification', {});

export const brand = new schema.Entity('brands', {
  certifications: [certification]
});

export default {};
