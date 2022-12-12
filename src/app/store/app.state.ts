import { ActionReducer, ActionReducerMap, MetaReducer } from '@ngrx/store';

import { AUTH_ACTIONS_TYPE } from '@store/actions';
import * as fromAuth from './reducers/auth.reducer';
import * as fromUsers from './reducers/user.reducer';

export interface AppState {
  auth: fromAuth.AuthState;
  users: fromUsers.UserState;
}

export const reducers: ActionReducerMap<AppState> = {
  auth: fromAuth.authReducer,
  users: fromUsers.userReducer
};

// console.log all actions && clearState on Logout
export const clearState =
  (reducer: ActionReducer<any>): ActionReducer<any> =>
  (state, action) => {
    // console.log('state', state);
    // console.log('action', action);
    if (action.type === AUTH_ACTIONS_TYPE.LOGOUT) {
      state = undefined;
    }
    return reducer(state, action);
  };

export const metaReducers: MetaReducer<AppState>[] = [clearState];
