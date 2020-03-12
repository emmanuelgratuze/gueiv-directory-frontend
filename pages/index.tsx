import { NextPage } from 'next'
import Link from 'next/link'

const Home: NextPage = () => (
  <>
    Index page
    <Link href="/brands">
      <a>
        Brands
      </a>
    </Link>
  </>
);

export default Home
