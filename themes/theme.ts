import { css } from 'styled-components'
import { deepMerge } from 'grommet/utils'
import { base } from 'grommet/themes'
import { ValueOf } from 'types/utils'
import { lighten, darken, rgba } from 'polished'

const baseSpacing = 24
const baseFontSize = 16

const fontSizing = (factor: number): { size: string; height: string; maxWidth: string } => ({
  size: `${baseFontSize * factor}px`,
  height: `${baseSpacing * factor * 1}px`,
  maxWidth: `${baseSpacing * (baseFontSize * factor * 5)}px`
})

const headingFontSizing = (factor: number): { size: string; height: string; maxWidth: string } => ({
  size: `${baseFontSize * factor}px`,
  height: `${baseSpacing * factor * 0.7}px`,
  maxWidth: `${baseSpacing * (baseFontSize * factor * 5)}px`
})

const darkColors = [
  '#1B1B1B',
  '#333333',
  '#555555',
  '#777777',
  '#999999',
  '#999999'
]

const lightColors = [
  '#F8F8F8',
  '#F2F2F2',
  '#EDEDED',
  '#DADADA',
  '#CCCCCC',
  '#BBBBBB',
  '#AAAAAA'
]

const statusColors: { [key: string]: string } = {
  critical: '#FF4040',
  error: '#FF4040',
  warning: '#FFAA15',
  ok: '#00C781'
}

const brandColors = {
  yellow: '#EFB82A',
  turquoise: '#A9D9DE',
  blue: '#1488CA',
  pink: '#EA7E83',
}

export const brandColorsNames = Object.keys(brandColors) as [keyof (typeof brandColors)]

const themeColors = {
  ...brandColors,
  gray: '#3D3D4F',
  'dark-gray': darken(0.03, '#3D3D4F'),

  black: '#000000',
  white: '#FFFFFF',

  // UI specific colors
  'light-blue': lighten(0.1, brandColors.blue),
  'dark-blue': darken(0.1, brandColors.blue),
  'light-yellow': lighten(0.1, brandColors.yellow),
  'dark-yellow': darken(0.1, brandColors.yellow),
  'light-turquoise': lighten(0.1, brandColors.turquoise),
}

// All the themeColors keys should exist in oppositeColors
const oppositeColors = {
  yellow: 'gray',
  turquoise: 'gray',
  blue: 'white',
  pink: 'white',
  gray: 'white',
  'dark-gray': 'white',
  black: 'white',
  white: 'gray',

  // UI specific colors
  'light-blue': 'gray',
  'dark-blue': 'gray',
  'light-yellow': 'gray',
  'dark-yellow': 'gray',
  'light-turquoise': 'gray'
}

export const colors: { [key: string]: string } = {
  ...themeColors,
  placeholder: rgba('#AAAAAA', 0.4),
  focus: 'pink'
}

const colorArray = (array: Array<string>, prefix: string): void => {
  array.forEach((color, index) => {
    colors[`${prefix}-${index + 1}`] = color
  })
}
// colorArray(accentColors, 'accent')
colorArray(darkColors, 'dark')
colorArray(lightColors, 'light')
// colorArray(neutralColors, 'neutral')

Object.keys(statusColors).forEach(color => {
  colors[`status-${color}`] = statusColors[color]
})

const theme = deepMerge(base, {
  global: {
    colors,
    brandColorsNames,
    brandColors,
    oppositeColors,
    breakpoints: {
      xxsmall: {
        value: baseSpacing * 15, // 768
        borderSize: {
          xsmall: '1px',
          small: '2px',
          medium: `${baseSpacing / 6}px`, // 4
          large: `${baseSpacing / 4}px`, // 6
          xlarge: `${baseSpacing / 2}px` // 12
        },
        edgeSize: {
          none: '0px',
          hair: '1px', // for Chart
          xxsmall: `${baseSpacing / 8}px`,
          xsmall: `${baseSpacing / 4}px`, // 3
          small: `${baseSpacing / 2}px`, // 6
          medium: `${baseSpacing}px`, // 12
          large: `${baseSpacing * 2}px`, // 24
          xlarge: `${baseSpacing * 4}px` // 48
        },
        size: {
          xxsmall: `${baseSpacing}px`, // 24
          xsmall: `${baseSpacing * 2}px`, // 48
          small: `${baseSpacing * 4}px`, // 96
          medium: `${baseSpacing * 8}px`, // 192
          large: `${baseSpacing * 16}px`, // 384
          xlarge: `${baseSpacing * 32}px`, // 768
          full: '100%'
        }
      },
      xsmall: {
        value: baseSpacing * 24, // 768
        borderSize: {
          xsmall: '1px',
          small: '2px',
          medium: `${baseSpacing / 6}px`, // 4
          large: `${baseSpacing / 4}px`, // 6
          xlarge: `${baseSpacing / 2}px` // 12
        },
        edgeSize: {
          none: '0px',
          hair: '1px', // for Chart
          xxsmall: `${baseSpacing / 8}px`,
          xsmall: `${baseSpacing / 4}px`, // 3
          small: `${baseSpacing / 2}px`, // 6
          medium: `${baseSpacing}px`, // 12
          large: `${baseSpacing * 2}px`, // 24
          xlarge: `${baseSpacing * 4}px` // 48
        },
        size: {
          xxsmall: `${baseSpacing}px`, // 24
          xsmall: `${baseSpacing * 2}px`, // 48
          small: `${baseSpacing * 4}px`, // 96
          medium: `${baseSpacing * 8}px`, // 192
          large: `${baseSpacing * 16}px`, // 384
          xlarge: `${baseSpacing * 32}px`, // 768
          full: '100%'
        }
      },
      small: {
        value: baseSpacing * 32, // 1152
        borderSize: {
          xsmall: '1px',
          small: '2px',
          medium: `${baseSpacing / 6}px`, // 4
          large: `${baseSpacing / 4}px`, // 6
          xlarge: `${baseSpacing / 2}px` // 12
        },
        edgeSize: {
          none: '0px',
          hair: '1px', // for Chart
          xxsmall: `${baseSpacing / 8}px`,
          xsmall: `${baseSpacing / 4}px`, // 3
          small: `${baseSpacing / 2}px`, // 6
          medium: `${baseSpacing}px`, // 12
          large: `${baseSpacing * 2}px`, // 24
          xlarge: `${baseSpacing * 4}px` // 48
        },
        size: {
          xxsmall: `${baseSpacing}px`, // 24
          xsmall: `${baseSpacing * 2}px`, // 48
          small: `${baseSpacing * 4}px`, // 96
          medium: `${baseSpacing * 8}px`, // 192
          large: `${baseSpacing * 16}px`, // 384
          xlarge: `${baseSpacing * 32}px`, // 768
          full: '100%'
        }
      },
      medium: {
        value: baseSpacing * 48, // 1152
        borderSize: {
          xsmall: '1px',
          small: '2px',
          medium: `${baseSpacing / 6}px`, // 4
          large: `${baseSpacing / 4}px`, // 6
          xlarge: `${baseSpacing / 2}px` // 12
        },
        edgeSize: {
          none: '0px',
          hair: '1px', // for Chart
          xxsmall: `${baseSpacing / 8}px`,
          xsmall: `${baseSpacing / 4}px`, // 3
          small: `${baseSpacing / 2}px`, // 6
          medium: `${baseSpacing}px`, // 12
          large: `${baseSpacing * 2}px`, // 24
          xlarge: `${baseSpacing * 4}px` // 48
        },
        size: {
          xxsmall: `${baseSpacing}px`, // 24
          xsmall: `${baseSpacing * 2}px`, // 48
          small: `${baseSpacing * 4}px`, // 96
          medium: `${baseSpacing * 8}px`, // 192
          large: `${baseSpacing * 16}px`, // 384
          xlarge: `${baseSpacing * 32}px`, // 768
          full: '100%'
        }
      },
      large: {
        value: baseSpacing * 70, // 1440
        borderSize: {
          xsmall: '1px',
          small: '2px',
          medium: `${baseSpacing / 6}px`, // 4
          large: `${baseSpacing / 4}px`, // 6
          xlarge: `${baseSpacing / 2}px` // 12
        },
        edgeSize: {
          none: '0px',
          hair: '1px', // for Chart
          xxsmall: `${baseSpacing / 8}px`,
          xsmall: `${baseSpacing / 4}px`, // 3
          small: `${baseSpacing / 2}px`, // 6
          medium: `${baseSpacing}px`, // 12
          large: `${baseSpacing * 2}px`, // 24
          xlarge: `${baseSpacing * 4}px` // 48
        },
        size: {
          xxsmall: `${baseSpacing}px`, // 24
          xsmall: `${baseSpacing * 2}px`, // 48
          small: `${baseSpacing * 4}px`, // 96
          medium: `${baseSpacing * 8}px`, // 192
          large: `${baseSpacing * 16}px`, // 384
          xlarge: `${baseSpacing * 32}px`, // 768
          full: '100%'
        }
      },
      xlarge: {}
    },
    font: {
      family: 'Quicksand'
    },
    focus: {
      border: {
        color: 'transparent'
      }
    },
    hover: {
      color: {
        dark: 'blue',
        light: 'blue'
      }
    }
  },
  box: {
    responsiveBreakpoint: 'medium'
  },
  text: {
    xxsmall: fontSizing(0.7),
    xsmall: fontSizing(0.8),
    small: fontSizing(0.9),
    medium: fontSizing(1),
    large: fontSizing(1.3),
    xlarge: fontSizing(2),
    xxlarge: fontSizing(3)
  },
  paragraph: {
    small: fontSizing(0.7),
    medium: fontSizing(0.9),
    large: fontSizing(1),
    xlarge: fontSizing(1.2),
    xxlarge: fontSizing(1.3),
    extend: css`
      letter-spacing: 0.1em;
    `
  },
  formField: {
    margin: {
      top: 'medium',
      bottom: 'medium'
    },
    border: {
      size: '0',
      color: 'light-4'
    },
    focus: {
      border: {
        color: 'blue'
      }
    },
    error: {},
    label: {
      margin: 'none',
      weight: 600,
      color: 'gray',
      style: {
        textTransform: 'uppercase'
      },
    },
    extend: css`
      align-items: center;
      justify-content: center;

      > div {
        width: 100%;
        transition: border-color 0.2s ease-out;
      }

      /* Errors or infos */
      span {
        font-weight: bold;
        font-size: 0.8rem;
        text-transform: uppercase;
      }
    `
  },
  checkBox: {
    border: {
      color: 'light-4'
    },
    hover: {
      border: {
        color: 'light-4'
      }
    },
    extend: css`
      > div > span {
        border-color: ${props => props.theme.global.colors['light-4']};
      }
    `
  },
  heading: {
    level: {
      1: {
        small: headingFontSizing(2),
        medium: headingFontSizing(3),
        large: headingFontSizing(3.5),
        xlarge: headingFontSizing(3.5)
      },
      2: {
        small: headingFontSizing(1.4),
        medium: headingFontSizing(1.25),
        large: headingFontSizing(1.8),
        xlarge: headingFontSizing(1.9),
      },
      3: {
        small: headingFontSizing(1),
        medium: headingFontSizing(1.15),
        large: headingFontSizing(1.15),
        xlarge: headingFontSizing(1.15),
      },
      4: {
        small: headingFontSizing(0.8),
        medium: headingFontSizing(1),
        large: headingFontSizing(1),
        xlarge: headingFontSizing(1)
      },
      5: {
        small: headingFontSizing(1),
        medium: headingFontSizing(1),
        large: headingFontSizing(1),
        xlarge: headingFontSizing(1)
      },
      6: {
        small: headingFontSizing(-1),
        medium: headingFontSizing(-1),
        large: headingFontSizing(-1),
        xlarge: headingFontSizing(-1)
      }
    }
  },
  textInput: {
    extend: css`
      /* padding-top: 0; */
      padding-left: 0;
      font-weight: 600;
      font-size: 0.9em;
      font-family: 'Quicksand', sans-serif;
      font-style: initial;
      text-align: center;
      border-color: ${colors.pink};
      border-radius: 5px;

      &:focus {
        color: ${colors.pink};
      }

      ::placeholder,
      ::-webkit-input-placeholder {
        font-weight: 400;
      }

      :-ms-input-placeholder {
        font-weight: 400;
      }
    `
  },
  textArea: {
    extend: css`
      min-height: 200px;
      white-space: pre-line;
      border: 1px solid ${props => props.theme.global.colors['light-4']};
      border-radius: 0;
    `
  },
  select: {
    container: {
      // extend: css``
    },
    control: {
      extend: css`
        min-width: '10rem';
        /* background-color: ${props => props.theme.global.colors['light-2']}; */
        border: none;
        border-radius: 0;
      `,
      open: {
        extend: css`
          border: 2px solid blue;
        `
      }
    }
  },
  button: {
    border: {
      width: 0,
      radius: '2em'
    },
    primary: {
      color: {
        dark: 'gray',
        light: 'gray'
      }
    }
  },
  layer: {
    container: {
      zIndex: 15
    }
  },

  // Custom
  header: {
    height: '4rem'
  }
})

export type ThemeType = typeof theme
export type BreakpointsType = ThemeType['global']['breakpoints']
export type ColorsType = ThemeType['global']['colors']
export type ThemeColorsType = typeof themeColors
export type BreakpointsKeysType = keyof BreakpointsType
export type BreakpointsValuesType = ValueOf<BreakpointsType>
export type BrandColorsKeys = keyof ThemeType['global']['brandColors']
export type ColorsNames = keyof ThemeType['global']['colors'] | keyof typeof colors | keyof typeof oppositeColors
export type ColorsNamesWithOpposite = keyof typeof oppositeColors
export default theme
