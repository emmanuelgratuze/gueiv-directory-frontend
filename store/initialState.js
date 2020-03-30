import { fromJS } from 'immutable'

import { getConfig } from '~/config/index'
import contentsProperties from '~/contents/contents.json'

export default fromJS({
  // Initial state
  app: {
    config: getConfig(process.env.APP_ENV || 'production'),
    contents: contentsProperties
  }
})
