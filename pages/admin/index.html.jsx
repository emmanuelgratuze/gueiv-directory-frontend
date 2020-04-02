
import React from 'react'
import Head from 'next/head'
import config from 'admin/config.json'
import { Widget as IdWidget } from '@ncwidgets/id'

if (typeof window !== 'undefined') {
  import('netlify-cms')
    .then((CMS) => {
      CMS.init({ config })
      CMS.registerWidget(IdWidget)
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
