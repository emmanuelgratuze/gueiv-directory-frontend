// import { ImmutableMap } from '~/types/immutable'
import { Record, Map } from 'immutable'

export interface CriterionIcon {
  id: string;
  name: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  createdAt: string;
  updatedAt: string;
}

export interface Criterion {
  id: string;
  name: string;
  description?: string;
  icon?: CriterionIcon;
}

// export type ImmutableCriterion = Record<Omit<Criterion, 'icon'>> & Record<{
//   icon?: Record<CriterionIcon>;
// }>
export type ImmutableCriterion = Record<Criterion>

export type CriteriaStateTree = Map<string, ImmutableCriterion>

export default {}
