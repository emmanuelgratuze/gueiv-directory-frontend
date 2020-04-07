
import React from 'react'
import Head from 'next/head'

import config from './config'

if (typeof window !== 'undefined') {
  Promise.all([
    import('netlify-cms'),
    import('./widgets/netlify-cms-widget-slug-relation/src')
  ])
    .then(([CMS, widget]) => {
      const { NetlifyCmsWidgetRelation } = widget
      CMS.registerWidget(NetlifyCmsWidgetRelation.Widget())
      CMS.init({ config })
    })
}

const AdminPage = () => ( // eslint-disable-line @typescript-eslint/explicit-function-return-type
  <>
    <Head>
      <title>Content Manager</title>
    </Head>
  </>
)

export default AdminPage
