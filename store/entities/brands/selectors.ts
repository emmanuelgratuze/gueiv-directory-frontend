import { RSAA } from '../middlewares/reduxApiMiddleware';
import { ADD_ENTITIES } from '../actions';
import { album, track } from '../../schemas';

export const FETCH_BRANDS_REQUEST = 'app/brands/FETCH_BRANDS_REQUEST';
export const FETCH_BRANDS_SUCCESS = 'app/brands/FETCH_BRANDS_SUCCESS';
export const FETCH_BRANDS_FAILURE = 'app/brands/FETCH_BRANDS_FAILURE';

export function fetchAlbum(id, { context = null } = {}) {
  return {
    [RSAA]: {
      types: [
        FETCH_BRANDS_REQUEST,
        {
          type: ADD_ENTITIES,
          meta: {
            schema: album,
            endAction: FETCH_BRANDS_SUCCESS
          }
        },
        FETCH_BRANDS_FAILURE
      ],
      endpoint: 'albums',
      method: 'GET'
    }
  };
}

export default {};
