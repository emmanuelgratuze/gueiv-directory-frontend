/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import YAML from 'yaml'
import fs from 'fs'
import configFile from '../cms/config'

const yamlConfig = YAML.stringify(configFile)

function createConfigFile(yamlConfigString) {
  fs.writeFile('./public/admin/config.yml', yamlConfigString, () => {
    console.log('Netlify CMS config file created successfully.')
  })
}

if (!fs.existsSync('./public/admin')) {
  // eslint-disable-next-line prefer-numeric-literals
  fs.mkdirSync('./public/admin', parseInt('0766', 8), (err) => {
    if (err) {
      console.log(err)
    } else {
      createConfigFile(yamlConfig)
    }
  })
} else {
  createConfigFile(yamlConfig)
}
