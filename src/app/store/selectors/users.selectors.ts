import { createSelector, createFeatureSelector } from '@ngrx/store';

import { UserState } from '@store/reducers';

export const UsersFeatureKey = 'users';

const usersState =
  createFeatureSelector<UserState>(UsersFeatureKey);

export const getAllUsers = createSelector(
  usersState,
  (state) => state.users
);

export const getUsersLoadingState = createSelector(
  usersState,
  (state) => state.loading
);

export const getUsersLoadedState = createSelector(
  usersState,
  (state) => state.loaded
);
