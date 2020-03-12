import { fromJS } from 'immutable'

export default fromJS({
  // Initial state

  app: {
    config: process.env.app,
    contents: process.env.contents
  }
})
