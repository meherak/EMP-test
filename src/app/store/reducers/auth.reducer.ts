import { on, Action, createReducer } from '@ngrx/store';
import { FirebaseErrorResponse } from '@shared/models';

import {
  Login,
  Signup,
  LoginFailure,
  LoginSuccess,
  SignupSuccess,
  SignupFailure,
} from '@store/actions';

export interface AuthState {
  token: string;
  loading: boolean;
  error: FirebaseErrorResponse | null;
}

const initialState: AuthState = {
  token: '',
  error: null,
  loading: false,
};

const reducer = createReducer(
  initialState,
  on(Login, Signup, (state: AuthState) => ({
    ...state,
    loading: true,
  })),
  on(LoginSuccess, (state: AuthState, payload) => ({
    ...state,
    loading: false,
    token: payload.token,
  })),
  on(SignupSuccess, (state: AuthState) => ({
    ...state,
    loading: false,
  })),
  on(LoginFailure, SignupFailure, (state: AuthState) => ({
    ...state,
    loading: false,
  }))
);

export const authReducer = (
  state: AuthState | undefined,
  action: Action
): AuthState => reducer(state, action);
