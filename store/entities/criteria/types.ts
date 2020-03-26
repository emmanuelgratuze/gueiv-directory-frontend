// import { ImmutableMap } from '~/types/immutable'
import { Record } from 'immutable'

export interface Criterion {
  id: string;
  name: string;
  description?: string;
  icon?: {
    id: string;
    name: string;
    ext: string;
    mime: string;
    size: number;
    url: string;
    createdAt: string;
    updatedAt: string;
  };
}

export type ImmutableCriterion = Record<Criterion>
