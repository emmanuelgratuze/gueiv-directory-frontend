import { Record } from 'immutable'
import contents from './contents'

export type AppContents = typeof contents

export type ImmutableAppContents = Record<AppContents>

export interface ProcessEnv {
  contents: string;
}

export default {}
