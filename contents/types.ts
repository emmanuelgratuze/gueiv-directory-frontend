import { Record } from 'immutable'

export interface AppContents {
  general: {
    title: string;
    description: string;
  };
}

export type ImmutableAppContents = Record<AppContents>

export interface ProcessEnv {
  contents: string;
}

export default {}
