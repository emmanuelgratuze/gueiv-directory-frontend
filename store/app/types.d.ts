import { Record } from 'immutable'
import { InterfaceTree } from 'store/interface/types.d'
import { ImmutableDataTree } from 'store/data/types.d'

export interface AppState {
  data: ImmutableDataTree;
  interface: InterfaceTree;
}

export type ImmutableAppState = Record<AppState>
