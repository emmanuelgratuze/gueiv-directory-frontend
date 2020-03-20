import { ImmutableMap } from '~/types/immutable.d'

export interface AppContents {
  general: {
    title: string;
    description: string;
  };
}

export type ImmutableAppContents = ImmutableMap<AppContents>

export interface ProcessEnv {
  contents: string;
}

export default {}
