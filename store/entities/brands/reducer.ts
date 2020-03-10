import { fromJS } from 'immutable';
import { ADD_ENTITIES, CLEAR_ENTITIES } from '../app/actions';
import mergeEntities from '@utils/redux/mergeEntities';
import { BasicAction } from '@store/types';

function brandsReducer(state = fromJS({}), action: BasicAction) {
  switch (action.type) {
    case ADD_ENTITIES: {
      if (!action.payload) {
        return state;
      }

      return mergeEntities(
        action.payload.entities.artists,
        state
      );
    }
    case CLEAR_ENTITIES: {
      if (!action.payload) {
        return state;
      }

      return action.payload.entitiesNames.includes('artists')
        ? fromJS({})
        : state;
    }
    default:
      return state;
  }
}

export default brandsReducer;
