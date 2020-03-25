// import { ThemeType } from 'grommet'

import theme from './theme'

export type ThemeType = typeof theme
export type BreakpointsType = ThemeType['global']['breakpoints']
export type BreakpointsKeysType = keyof BreakpointsType
export type BreakpointsValuesType = ValueOf<BreakpointsType>

export default {}
