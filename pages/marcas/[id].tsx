import { NextPage, GetStaticProps, GetStaticPaths, GetServerSideProps } from 'next'
import Link from 'next/link'
import Head from 'next/head'
import Page from '@components/Page'

// Redux
import { fetchBrands } from '@store/entities/brands/actions'
import { selectBrands } from '@store/entities/brands/selectors'

import store from '@store/index';

const Brand: NextPage = () => (
  <>
    <Page title="Marca">
      Index page
      <Link href="/">
        <a>
          Index
        </a>
      </Link>
    </Page>
  </>
);

export const getStaticProps: GetStaticProps = async () => {
  await store.dispatch(fetchBrands());
  const brands = selectBrands(store.getState());

  return {
    props: {}
  };
}

export async function getStaticPaths() {
  await store.dispatch(fetchBrands());
  const brands = selectBrands(store.getState());

  console.log(brands.toJS());

  return {
    paths: [{
      params: { id: '1' }
    }],
    fallback: false
  }
}

export default Brand
