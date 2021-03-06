const withImages = require('next-images')
const withPlugins = require('next-compose-plugins')
const appConfig = require('./app.config.json')

require('dotenv').config()

module.exports = withPlugins(
  [
    withImages
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
          loader: 'url-loader',
          options: {
            jsx: true
          }
        }]
      })
      config.module.rules.unshift({
        test: /\.css$/,
        use: ['raw-loader']
      })
      return config
    },
    env: {
      CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
      CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
      MAILCHIMP_USERNAME: process.env.MAILCHIMP_USERNAME,
      MAILCHIMP_U: process.env.MAILCHIMP_U,
      MAILCHIMP_ID: process.env.MAILCHIMP_ID,
      MAILCHIMP_FORM_ID: process.env.MAILCHIMP_FORM_ID,
      GOOGLE_ANALYTICS_TRACKING_ID: process.env.GOOGLE_ANALYTICS_TRACKING_ID,
      ...appConfig
    }
  }
)
