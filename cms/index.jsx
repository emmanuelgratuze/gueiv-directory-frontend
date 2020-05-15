import appConfig from '../app.config.json'
import getConfig from './config'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const loadCMS = () => {
  if (typeof window !== 'undefined') {
    Promise.all([
      import('netlify-cms'),
      import('./widgets/netlify-cms-widget-slug-relation/src')
    ])
      .then(([CMS, widget]) => {
        const { NetlifyCmsWidgetRelation } = widget
        CMS.registerWidget(NetlifyCmsWidgetRelation.Widget())
        CMS.init({ config: getConfig(appConfig) })
      })
  }
}

export default {
  loadCMS
}
