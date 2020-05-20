import { useEffect } from 'react'
import { Store, AnyAction } from 'redux'

import { addData } from 'store/data/actions'
import { Data, SchemaKeys } from 'store/data/types'

const useStaticDataInStore = (
  store: Store<unknown, AnyAction>,
  pageProps: { data: { data: Data[]; schema: SchemaKeys | SchemaKeys[] }[] }
): void => {
  useEffect(() => {
    if (pageProps.data) {
      pageProps.data.forEach((datum): void => {
        store.dispatch(addData(datum.schema, datum.data))
      })
    }
  }, [pageProps])
}

export default useStaticDataInStore
