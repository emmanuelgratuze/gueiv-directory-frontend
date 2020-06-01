import { useEffect, useCallback } from 'react'
import { Store, AnyAction } from 'redux'

import { addData, clearData } from 'store/data/actions'
import { Data, SchemaKeys } from 'store/data/types'
import useBrowser from 'hooks/generic/useBrowser'

const useStaticDataInStore = (
  store: Store<unknown, AnyAction>,
  pageProps: { data: { data: Data[]; schema: SchemaKeys | SchemaKeys[] }[] }
): void => {
  const { isServerSide } = useBrowser()
  const addDataToStore = useCallback(() => {
    if (pageProps.data) {
      pageProps.data.forEach((datum): void => {
        store.dispatch(addData(datum.schema, datum.data))
      })
    }
  }, [pageProps.data])
  if (isServerSide) {
    store.dispatch(clearData())
    addDataToStore()
  } else {
    useEffect(() => {
      addDataToStore()
    }, [pageProps.data])
  }
}

export default useStaticDataInStore
