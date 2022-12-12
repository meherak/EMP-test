import { on, Action, createReducer } from '@ngrx/store';

import {
  GetAllUsers,
  GetAllUsersSuccess,
  GetAllUsersFailure,
} from '@store/actions';

export interface UserState {
  users: any;
  error: any;
  loaded: boolean;
  loading: boolean;
}

const initialState: UserState = {
  loading: false,
  users: [],
  loaded: false,
  error: null,
};

const reducer = createReducer(
  initialState,
  on(GetAllUsers, (state: UserState) => ({
    ...state,
    loaded: false,
    loading: true,
  })),
  on(GetAllUsersSuccess, (state: UserState, { result }) => ({
    ...state,
    users: result,
    loading: false,
    loaded: true,
  })),
  on(GetAllUsersFailure, (state: UserState, { error }) => ({
    ...state,
    error,
    loaded: false,
    loading: false,
  }))
);

export const userReducer = (
  state: UserState | undefined,
  action: Action
): UserState => reducer(state, action);
