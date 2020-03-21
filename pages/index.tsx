import React from 'react'
import { NextPage, GetStaticProps } from 'next'
import Link from 'next/link'
import Page from '~/components/Page'

const Home: NextPage = () => (
  <>
    <Page title="Home">
      Index page
      <Link href="/brands">
        <a>
          Brands
        </a>
      </Link>
    </Page>
  </>
)

export const getStaticProps: GetStaticProps = async () => (
  {
    props: {}
  }
)

export default Home
