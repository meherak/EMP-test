import { AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { props, createAction } from '@ngrx/store';

import { User } from '@shared/models';

export const USERS_ACTIONS_TYPE = {
  GET_ALL_USERS: '[Users] Get All Users',
  GET_ALL_USERS_SUCCESS: '[Users] Get All Users Success',
  GET_ALL_USERS_FAILURE: '[Users] Get All Users Failure',
};

export const GetAllUsers = createAction(
  USERS_ACTIONS_TYPE.GET_ALL_USERS
);
export const GetAllUsersSuccess = createAction(
  USERS_ACTIONS_TYPE.GET_ALL_USERS_SUCCESS,
  props<{ result: User[] }>()
);
export const GetAllUsersFailure = createAction(
  USERS_ACTIONS_TYPE.GET_ALL_USERS_FAILURE,
  props<{ error: any }>()
);
