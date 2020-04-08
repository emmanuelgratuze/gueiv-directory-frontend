// import { ImmutableMap } from 'types/immutable'
import { Record } from 'immutable'

export interface Configuration {
  general: {
    title: string;
    description: string;
    menuDescription: string;
  };
  social: {
    facebook: string;
    instagram: string;
    email: string;
  };
  criteriaPage: {
    title: string;
    introduction: string;
  };
}

export type ImmutableConfiguration = Record<Configuration>

export {}
