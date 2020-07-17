const config = {
  presets: [
    [
      'next/babel',
      {
        'preset-env': {
          targets: {
            browsers: 'defaults'
          },
          useBuiltIns: 'entry',
          corejs: '3.0.0'
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
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.d.ts']
      }
    ]
  ]
}

if (process.env.NODE_ENV !== 'production') {
  config.plugins.push('babel-plugin-typescript-to-proptypes')
}

module.exports = config
