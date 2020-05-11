import { useTheme } from 'styled-components'
import { ThemeType } from 'themes/theme'

type UseThemeType = {
  theme: ThemeType;
  colors: ThemeType['global']['colors'];
  oppositeColors: ThemeType['global']['oppositeColors'];
  brandColors: ThemeType['global']['brandColors'];
}

export default (): UseThemeType => {
  const theme = useTheme() as ThemeType

  return {
    theme,
    colors: theme.global.colors,
    brandColors: theme.global.brandColors,
    oppositeColors: theme.global.oppositeColors
  }
}
