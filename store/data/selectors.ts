
import { ImmutableAppState } from 'store/app/types'
import { ImmutableDataTree } from './types.d'

export const selectData = (state: ImmutableAppState): ImmutableDataTree => (
  state.get('data')
)

export default {}
