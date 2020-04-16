import { useEffect, useState } from 'react'
import { Store } from 'redux'

import configureStore from 'store/index'
import { addData } from 'store/data/actions'
import { Data, SchemaKeys } from 'store/data/types'

type UseStoreWithPageDataReturnValue = {
  store: Store;
  isReady: boolean;
}

const useStoreWithPageData = (
  pageProps: { data: { data: Data[]; schema: SchemaKeys | SchemaKeys[] }[] }
): UseStoreWithPageDataReturnValue => {
  const [store] = useState(configureStore())
  const [isReady, setIsReady] = useState(false)

  const addDataToStore = async (): Promise<void> => {
    if (pageProps.data) {
      const promises = pageProps.data.map((datum) => (
        store.dispatch(addData(datum.schema, datum.data))
      ))
      await Promise.all(promises)
      setIsReady(true)
    }
  }

  useEffect(() => {
    addDataToStore()
  }, [])

  return {
    store,
    isReady
  }
}

export default useStoreWithPageData
