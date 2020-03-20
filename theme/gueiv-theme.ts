import { css, FlattenSimpleInterpolation } from 'styled-components'
import { deepMerge } from 'grommet/utils'
import { base } from 'grommet/themes'

const baseSpacing = 24
const baseFontSize = 16

const fontSizing = (factor: number): { size: string; height: string; maxWidth: string } => ({
  size: `${baseFontSize * factor}px`,
  height: `${baseSpacing * factor}px`,
  maxWidth: `${baseSpacing * (baseFontSize * factor)}px`
})

const fontSizingStyles = (factor: number): FlattenSimpleInterpolation => css`
  font-size: ${factor}rem;
  line-height: ${factor}rem;
`

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

const colors: { [key: string]: string } = {
  black: '#000000',
  white: '#FFFFFF'
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

export default deepMerge(base, {
  global: {
    colors,
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
        value: baseSpacing * 36, // 1152
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
        value: baseSpacing * 46, // 1152
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
      large: {} // anything above 'medium'
    },
    font: {
      family: 'Open Sans'
    },
    focus: {
      border: {
        color: 'transparent'
      }
    }
  },
  box: {
    responsiveBreakpoint: 'medium'
  },
  text: {
    xxsmall: {
      ...fontSizing(0.7)
    },
    xsmall: {
      ...fontSizing(0.8)
    },
    small: {
      ...fontSizing(0.9)
    },
    medium: {
      ...fontSizing(1)
    },
    large: {
      ...fontSizing(1.3)
    },
    xlarge: {
      ...fontSizing(2)
    },
    xxlarge: {
      ...fontSizing(3)
    },
    extend: css`
      line-height: 1.5em !important;
    `
  },
  formField: {
    margin: {
      top: 'medium',
      bottom: 'medium'
    },
    border: {
      color: 'light-4'
    },
    label: {
      margin: 'none',
      weight: 600,
      color: 'gray',
      style: {
        textTransform: 'uppercase'
      },
    }
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
        xxsmall: css`
          ${fontSizingStyles(1.8)}
        `,
        xsmall: css`
          ${fontSizingStyles(2)}
        `,
        small: css`
          ${fontSizingStyles(2.5)}
        `,
        medium: css`
          ${fontSizingStyles(3.5)}
        `,
        large: css`
          ${fontSizingStyles(3.5)}
        `,
        xlarge: css`
          ${fontSizingStyles(3.5)}
        `,
        extend: css``
      },
      2: {
        xxsmall: css`
          ${fontSizingStyles(1.4)}
        `,
        xsmall: css`
          ${fontSizingStyles(1.5)}
        `,
        small: css`
          ${fontSizingStyles(1.5)}
        `,
        medium: css`
          ${fontSizingStyles(2.5)}
        `,
        large: css`
          ${fontSizingStyles(2.5)}
        `,
        xlarge: css`
          ${fontSizingStyles(2.5)}
        `,
        extend: css``
      },
      3: {
        xxsmall: css`
          ${fontSizingStyles(1)}
        `,
        xsmall: css`
          ${fontSizingStyles(1.15)}
        `,
        small: css`
          ${fontSizingStyles(1.15)}
        `,
        medium: css`
          ${fontSizingStyles(1.15)}
        `,
        large: css`
          ${fontSizingStyles(1.15)}
        `,
        xlarge: css`
          ${fontSizingStyles(1.15)}
        `,
        extend: css``
      },
      4: {
        xxsmall: css`
          ${fontSizingStyles(0.9)}
        `,
        xsmall: css`
          ${fontSizingStyles(1)}
        `,
        small: css`
          ${fontSizingStyles(1)}
        `,
        medium: css`
          ${fontSizingStyles(1)}
        `,
        large: css`
          ${fontSizingStyles(1)}
        `,
        xlarge: css`
          ${fontSizingStyles(1)}
        `,
        extend: css``
      },
      5: {
        xxsmall: css`
          ${fontSizingStyles(0.7)}
        `,
        xsmall: css`
          ${fontSizingStyles(0.8)}
        `,
        small: css`
          ${fontSizingStyles(1)}
        `,
        medium: css`
          ${fontSizingStyles(1)}
        `,
        large: css`
          ${fontSizingStyles(1)}
        `,
        xlarge: css`
          ${fontSizingStyles(1)}
        `,
        extend: css``
      },
      6: {
        font: {
          // family: undefined,
          // weight: undefined,
        },
        small: css`
          ${fontSizingStyles(-1)}
        `,
        medium: css`
          ${fontSizingStyles(-1)}
        `,
        large: css`
          ${fontSizingStyles(-1)}
        `,
        xlarge: css`
          ${fontSizingStyles(-1)}
        `,
        extend: css``
      }
    },
    extend: css``
  },
  textInput: {
    extend: css`
      padding-left: 0;
      border-width: 0 !important;
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
      radius: 0
    },
    primary: {
      color: {
        dark: 'brand',
        light: 'brand'
      }
    },
    padding: {
      vertical: '0.8rem',
      horizontal: '2.8rem'
    }
  }
})
