import { NextPage } from 'next'
import Link from 'next/link'
import Head from 'next/head'
import Page from '@components/Page';

const Brand: NextPage = () => (
  <>
    <Page title="Marcas">
      Index page
      <Link href="/">
        <a>
          Index
        </a>
      </Link>
    </Page>
  </>
);

export default Brand
