// import { ImmutableMap } from 'types/immutable'
import { Record } from 'immutable'

export interface Criterion {
  id: string;
  name: string;
  description?: string;
  icon?: string;
  iconContent: string;
}

export type ImmutableCriterion = Record<Criterion>

export default {}
