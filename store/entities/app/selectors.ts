import { RootStateOrAny } from 'react-redux';
import { createSelector } from 'reselect'

export const selectApp = (state: RootStateOrAny) => state.get('app')

export const selectAppConfig = createSelector(
  selectApp,
  (app) => app.get('config')
);

export const selectAppContents = createSelector(
  selectApp,
  (app) => app.get('contents')
);

export {}
