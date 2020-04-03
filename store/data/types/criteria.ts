// import { ImmutableMap } from '~/types/immutable'
import { Record } from 'immutable'

export interface CriterionIcon {
  id: string;
  name: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  createdAt: string;
  updatedAt: string;
  content: string;
}

export interface Criterion {
  id: string;
  name: string;
  description?: string;
  icon?: CriterionIcon;
}

export type ImmutableCriterion = Record<Criterion>

export default {}
