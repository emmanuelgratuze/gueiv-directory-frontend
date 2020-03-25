import { useTheme } from 'styled-components'
import { ThemeType } from '~/themes/theme.d'

export default (): ThemeType => (
  useTheme() as ThemeType
)
