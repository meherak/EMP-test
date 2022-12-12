import { createAction, props } from '@ngrx/store';

import {
  LoginPayload,
  LoginResponse,
  FirebaseErrorResponse,
  SignupPayload,
} from '@shared/models';

export const AUTH_ACTIONS_TYPE = {
  LOGIN: '[Auth] Login',
  LOGIN_SUCCESS: '[Auth] Login Success',
  LOGIN_FAILURE: '[Auth] Login Failure',


  SIGNUP: '[Auth] SIGNUP',
  SIGNUP_SUCCESS: '[Auth] SIGNUP Success',
  SIGNUP_FAILURE: '[Auth] SIGNUP Failure',

  INIT_FROM_LSTORAGE: '[Auth] Init auth from LocalStorage',
  
  LOGOUT: '[Auth] Logout',
};


// Signin Actions
export const Login = createAction(
  AUTH_ACTIONS_TYPE.LOGIN,
  props<LoginPayload>()
);
export const LoginSuccess = createAction(
  AUTH_ACTIONS_TYPE.LOGIN_SUCCESS,
  props<LoginResponse>()
);
export const LoginFailure = createAction(
  AUTH_ACTIONS_TYPE.LOGIN_FAILURE,
  props<FirebaseErrorResponse>()
);



// Signup actions
export const Signup = createAction(
  AUTH_ACTIONS_TYPE.SIGNUP,
  props<SignupPayload>()
);
export const SignupSuccess = createAction(
  AUTH_ACTIONS_TYPE.SIGNUP_SUCCESS,
  props<any>()
);
export const SignupFailure = createAction(
  AUTH_ACTIONS_TYPE.SIGNUP_FAILURE,
  props<FirebaseErrorResponse>()
);

// Init 
export const InitAuthFromLocalStorage = createAction(
  AUTH_ACTIONS_TYPE.INIT_FROM_LSTORAGE
);


// Logout actions
export const Logout = createAction(AUTH_ACTIONS_TYPE.LOGOUT);
