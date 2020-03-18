import { NextPage } from 'next'
import Link from 'next/link'
import Page from '@components/Page';

const Home: NextPage = () => (
  <>
    <Page>
      Index page
      <Link href="/brands">
        <a>
          Brands
        </a>
      </Link>
    </Page>
  </>
);

export async function getStaticProps() {
  return {
    props: {}
  };
}

export default Home
