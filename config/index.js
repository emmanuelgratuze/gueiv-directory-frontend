const devConfig = require('./app.dev');
const stagingConfig = require('./app.staging');
const prodConfig = require('./app.prod');

function getConfig(env = process.env.NODE_ENV) {
  switch (env) {
    case 'development':
      return devConfig;
    case 'staging':
      return stagingConfig;
    case 'production':
      return prodConfig;
    default:
      return devConfig;
  }
}

module.exports = {
  getConfig
}
