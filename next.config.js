const withTM = require('next-transpile-modules')
const dotenv = require('dotenv')
const path = require('path')
const webpack = require('webpack')
const withImages = require('next-images')
const withPlugins = require('next-compose-plugins')

const { getConfig } = require('./config')
const contentsProperties = require('./contents/contents.json')

// Get local env
const { parsed: localClientConfig } = dotenv.config({
  path: path.resolve(process.cwd(), '.env.client')
})

const { parsed: localServerConfig } = dotenv.config({
  path: path.resolve(process.cwd(), '.env')
})

module.exports = withPlugins(
  [
    [
      withTM,
      {
        transpileModules: ['gsap'],
        exportPathMap: () => ({
          '/': { page: '/' },
        })
      }
    ],
    [
      withImages,
      {
        // assetPrefix: 'static'
      }
    ]
  ],
  {
    generateEtags: false,
    dir: '.', // base directory where everything is, could move to src later
    webpack(config) {
      // Perform customizations to webpack config
      config.module.rules.push({
        // shader import support
        test: /\.glsl$/,
        use: [
          {
            loader: 'emit-file-loader',
            options: {
              name: 'dist/[path][name].[ext]'
            }
          },
          'babel-loader',
          'webpack-glsl-loader'
        ]
      })

      config.module.rules.slice()
      config.module.rules.unshift({
        test: /\.svg$/,
        use: [{
          loader: '@svgr/webpack',
          options: {
            svgoConfig: {
              plugins: [
                { removeViewBox: false }
              ]
            }
          },
        },
        {
          loader: 'file-loader',
          options: {
            jsx: true
          }
        }]
      })

      config.module.rules.unshift({
        test: /\.css$/,
        use: ['raw-loader']
      })

      config.plugins.push(
        new webpack.EnvironmentPlugin({
          ...localClientConfig,
          app: { ...getConfig(localServerConfig.NODE_ENV || 'production') },
          contents: { ...contentsProperties }
        })
      )

      // Unshift polyfills in main entrypoint.
      const originalEntry = config.entry
      // eslint-disable-next-line
      config.entry = async () => {
        const entries = await originalEntry()
        if (entries['main.js']) {
          entries['main.js'].unshift('./utils/polyfill.js')
        }
        return entries
      }


      return config
    }
  }
)
