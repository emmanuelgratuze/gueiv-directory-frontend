import React from 'react'
import Head from 'next/head'
import { loadCMS } from 'cms/index'

loadCMS()

const AdminPage: React.FC = () => (
  <>
    <Head>
      <title>Content Manager</title>
    </Head>
  </>
)

export default AdminPage
