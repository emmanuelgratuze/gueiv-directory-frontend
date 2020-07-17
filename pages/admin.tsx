import React from 'react'
import Head from 'next/head'
import { loadCMS } from 'cms/index'

loadCMS()

const AdminPage: React.FC = () => (
  <>
    <Head>
      <title>Content Manager</title>
      <script src="https://identity.netlify.com/v1/netlify-identity-widget.js" />
    </Head>
  </>
)

export default AdminPage
