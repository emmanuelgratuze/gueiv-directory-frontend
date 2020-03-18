import { RSAA } from '@store/middlewares/reduxApiMiddleware';
import { brand } from '@store/schemas';
import { ADD_ENTITIES } from '@store/entities/app/actions';
import { RSAAAction } from 'redux-api-middleware';

export const FETCH_REQUEST = 'app/brands/FETCH_REQUEST';
export const FETCH_SUCCESS = 'app/brands/FETCH_SUCCESS';
export const FETCH_FAILURE = 'app/brands/FETCH_FAILURE';
export function fetchBrands() {
  const action: RSAAAction = {
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
      method: 'GET'
    }
  };
  return action;
}
