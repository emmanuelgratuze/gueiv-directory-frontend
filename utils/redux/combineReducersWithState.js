import { Map } from 'immutable';

export default (
  reducers,
  getDefaultState = () => Map(),
  parentState = null
) => {
  const reducerKeys = Object.keys(reducers);

  // eslint-disable-next-line arrow-body-style
  return (inputState = getDefaultState(), action) => {
    return inputState
      .withMutations((temporaryState) => {
        reducerKeys.forEach((reducerName) => {
          const reducer = reducers[reducerName];
          const currentDomainState = temporaryState.get(reducerName);
          // Pass inputState to reducers
          const nextDomainState = reducer(currentDomainState, action, inputState, parentState);
          temporaryState.set(reducerName, nextDomainState);
        });
      })
  }
}
