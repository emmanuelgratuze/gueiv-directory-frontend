import { useEffect } from 'react'
import { Store } from 'redux'

import configureStore from 'store/index'
import { addData } from 'store/data/actions'
import { Data, SchemaKeys } from 'store/data/types'

const useStoreWithPageData = (
  pageProps: { data: { data: Data[]; schema: SchemaKeys | SchemaKeys[] }[] }
): Store => {
  const store = configureStore()

  const addDataToStore = async (): Promise<void> => {
    if (pageProps.data) {
      const promises = pageProps.data.map((datum) => (
        store.dispatch(addData(datum.schema, datum.data))
      ))
      await Promise.all(promises)
    }
  }

  useEffect(() => {
    addDataToStore()
  }, [pageProps])

  return store
}

export default useStoreWithPageData
