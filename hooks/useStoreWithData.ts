import { useEffect } from 'react'
import { Store } from 'redux'

import configureStore from 'store/index'
import { addData } from 'store/data/actions'
import { Data, SchemaKeys } from 'store/data/types'
import { triggerDataReady } from 'store/interface/actions'

const useStoreWithData = (
  pageProps: { data: { data: Data[]; type: SchemaKeys | SchemaKeys[] }[] }
): Store => {
  const store = configureStore()

  useEffect(() => {
    if (pageProps.data) {
      pageProps.data.forEach((datum) => {
        store.dispatch(addData(datum.type, datum.data))
      })
    }
    store.dispatch(triggerDataReady())
  })

  return store
}

export default useStoreWithData
