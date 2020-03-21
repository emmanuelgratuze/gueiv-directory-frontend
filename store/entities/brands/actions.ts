import { RSAAAction } from 'redux-api-middleware'
import { RSAA } from '~/store/middlewares/reduxApiMiddleware'
import { brand } from '~/store/schemas'
import { ADD_ENTITIES } from '~/store/app/types'
import { selectBrands } from './selectors'

export const FETCH_REQUEST = 'app/brands/FETCH_REQUEST'
export const FETCH_SUCCESS = 'app/brands/FETCH_SUCCESS'
export const FETCH_FAILURE = 'app/brands/FETCH_FAILURE'

export function fetchBrands(): RSAAAction {
  return {
    [RSAA]: {
      types: [
        FETCH_REQUEST,
        {
          type: ADD_ENTITIES,
          meta: {
            schema: [brand],
            endAction: FETCH_SUCCESS
          }
        },
        FETCH_FAILURE
      ],
      endpoint: 'brands',
      method: 'GET',
      bailout: (state) => selectBrands(state).size > 0
    }
  }
}

export default {}
