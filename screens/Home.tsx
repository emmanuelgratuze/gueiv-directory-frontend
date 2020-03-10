import React from 'react';
import Head from 'next/head'
import Link from 'next/Link';

const HomeScreen: React.FC = () => {
  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <div>
        <Link href="/brands">
          Brands
        </Link>
      </div>
    </>
  );
}

export default HomeScreen;
