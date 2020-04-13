import { BasicAction } from 'store/types'
import { List, Record } from 'immutable'

export type ApplyFilterAction = Omit<BasicAction, 'payload'> & {
  payload: {
    filterId: string;
    filterValue: List<string>;
  };
}

export type Filter = Record<{
  id: string;
  brandProperty: string;
  dataEntity: string;
  label: string;
}>

export {}
