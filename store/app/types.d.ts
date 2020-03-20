export const SET_CONFIG = 'app/SET_CONFIG'
export const ADD_ENTITIES = 'app/ADD_ENTITIES'
export const CLEAR_ENTITIES = 'app/CLEAR_ENTITIES'

export interface ApiConfig {
  language: 'es' | 'en' | 'fr';
  host: string;
  headers: {
    [key: string]: string;
  };
}

export interface AppConfig {
  api: ApiConfig;
}

export interface AppEntities {
  brands?: {
    [key: string]: Brand;
  };
}

export interface AppState {
  entities: AppEntities;
  app: {
    config: AppConfig;
    contents: AppContents;
  };
}

export interface SetConfigAction {
  type: typeof SET_CONFIG;
  payload: AppConfig;
}

export interface AddEntitiesAction extends BasicAction {
  type: typeof ADD_ENTITIES;
  payload: {
    entities: AppEntities;
  };
  meta?: {
    schema: SchemaObject<unknown>;
    endAction: BasicAction;
  };
}

export interface ClearEntitiesAction {
  type: typeof CLEAR_ENTITIES;
  payload: {
    entitiesNames: keyof AppEntities;
  };
}

export type ImmutableAppState = ImmutableMap<AppState>
export type ImmutableAppConfig = ImmutableMap<AppConfig>
