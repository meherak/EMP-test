import { createSelector, createFeatureSelector } from '@ngrx/store';

import { AuthState } from '@store/reducers';

export const AuthFeatureKey = 'auth';
const authState = createFeatureSelector<AuthState>(AuthFeatureKey);

export const getAuthLoading = createSelector(
  authState,
  (state: AuthState) => state.loading
);
