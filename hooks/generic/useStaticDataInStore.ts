import { useEffect } from 'react'
import { Store, AnyAction } from 'redux'

import { addData, clearData } from 'store/data/actions'
import { Data, SchemaKeys } from 'store/data/types'
import useBrowser from 'hooks/generic/useBrowser'

const useStaticDataInStore = (
  store: Store<unknown, AnyAction>,
  pageProps: { data: { data: Data[]; schema: SchemaKeys | SchemaKeys[] }[] }
): void => {
  const { isServerSide } = useBrowser()
  if (isServerSide && pageProps.data) {
    store.dispatch(clearData())
    pageProps.data.forEach((datum): void => {
      store.dispatch(addData(datum.schema, datum.data))
    })
  } else {
    useEffect(() => {
      pageProps.data.forEach((datum): void => {
        store.dispatch(addData(datum.schema, datum.data))
      })
    }, [pageProps])
  }
}

export default useStaticDataInStore
