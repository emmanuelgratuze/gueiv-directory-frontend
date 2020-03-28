
const config = {
  presets: [
    [
      'next/babel',
      {
        'preset-env': {
          targets: {
            browsers: 'defaults'
          },
          useBuiltIns: 'entry'
        }
      }
    ]
  ],
  plugins: [
    [
      'styled-components',
      {
        ssr: true,
        displayName: true,
        preprocess: false
      }
    ],
    [
      'module-resolver',
      {
        root: ['.'],
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.d.ts'],
        alias: {
          '~/api': './api',
          '~/pages': './pages',
          '~/screens': './screens',
          '~/components': './components',
          '~/contexts': './contexts',
          '~/themes': './themes',
          '~/types': './types',
          '~/config': './config',
          '~/assets': './assets',
          '~/hooks': './hooks',
          '~/store': './store',
          '~/contents': './contents',
          '~/utils': './utils'
        }
      }
    ]
  ]
}

if (process.env.NODE_ENV !== 'production') {
  config.plugins.push('babel-plugin-typescript-to-proptypes')
}

module.exports = config
