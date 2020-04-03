import { Record } from 'immutable'
import { InterfaceTree } from 'store/interface/types.d'
import { EntitiesTree } from 'store/entities/types.d'

export interface AppState {
  entities: EntitiesTree;
  interface: InterfaceTree;
}

export type ImmutableAppState = Record<AppState>
