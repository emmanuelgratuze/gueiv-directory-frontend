import { useEffect } from 'react'
import { Store } from 'redux'

import configureStore from '~/store/index'

import { addEntities } from '~/store/data/actions'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const useStorePreloadedWithStaticProps = (pageProps: any): Store => {
  const store = configureStore()

  useEffect(() => {
    if (Array.isArray(pageProps.entities)) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      pageProps.entities.forEach((data: any) => {
        store.dispatch(addEntities(data))
      })
    }
  })

  return store
}

export default useStorePreloadedWithStaticProps
