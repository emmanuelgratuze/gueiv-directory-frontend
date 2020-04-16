import { BasicAction } from 'store/types'
import { List, Record } from 'immutable'
import { APPLY_FILTER, APPLY_FILTERS } from './actionsTypes'

export type ApplyFilterAction = Omit<BasicAction, 'payload'> & {
  type: typeof APPLY_FILTER;
  payload: {
    filterId: string;
    filterValue: List<string>;
  };
}

export type ApplyFiltersActions = Omit<BasicAction, 'payload'> & {
  type: typeof APPLY_FILTERS;
  payload: {
    filters: {
      [key: string]: unknown;
    };
  };
}

export type Filter = Record<{
  id: string;
  brandProperty: string;
  dataEntity: string;
  label: string;
}>

export {}
