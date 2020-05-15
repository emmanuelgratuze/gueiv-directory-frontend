/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import YAML from 'yaml'
import fs from 'fs'
import appConfig from '../app.config.json'
import getConfig from './config'

const yamlConfig = YAML.stringify(getConfig(appConfig))

function createConfigFiles(yamlConfigString) {
  fs.writeFile('./public/config.yml', yamlConfigString, () => {
    console.log('Netlify CMS config file created successfully.')
  })
}

if (!fs.existsSync('./public')) {
  // eslint-disable-next-line prefer-numeric-literals
  fs.mkdirSync('./public', parseInt('0766', 8), (err) => {
    if (err) {
      console.log(err)
    } else {
      createConfigFiles(yamlConfig)
    }
  })
} else {
  createConfigFiles(yamlConfig)
}
