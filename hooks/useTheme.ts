import { useTheme } from 'styled-components'
import { ThemeType } from '~/themes/theme'

type UseThemeType = {
  theme: ThemeType;
  colors: ThemeType['global']['colors'];
  oppositeColors: ThemeType['global']['oppositeColors'];
}

export default (): UseThemeType => {
  const theme = useTheme() as ThemeType

  return {
    theme,
    colors: theme.global.colors,
    oppositeColors: theme.global.oppositeColors
  }
}
