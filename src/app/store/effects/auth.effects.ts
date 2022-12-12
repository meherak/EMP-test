import { EMPTY, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError, mergeMap, switchMap } from 'rxjs/operators';

import {
  ofType,
  Actions,
  createEffect,
  ROOT_EFFECTS_INIT,
} from '@ngrx/effects';
import {
  Login,
  Logout,
  Signup,
  LoginFailure,
  LoginSuccess,
  SignupSuccess,
  SignupFailure,
  InitAuthFromLocalStorage,
} from '@store/actions';
import { AuthService, LocalStorageService } from '@core/services';

@Injectable()
export class AuthEffects {
  constructor(
    private readonly actions: Actions,
    private readonly authService: AuthService,
    private readonly localStorageService: LocalStorageService
  ) {}

  login = createEffect(() =>
    this.actions.pipe(
      ofType(Login),
      mergeMap((action) => {
        const { email, password } = action;
        return this.authService.login({ email, password }).pipe(
          switchMap((result: any) => {
            this.localStorageService.setItem('uid', result.user.uid);
            return [LoginSuccess(result)];
          }),
          catchError((err: HttpErrorResponse) => of(LoginFailure(err)))
        );
      })
    )
  );

  signup = createEffect(() =>
    this.actions.pipe(
      ofType(Signup),
      mergeMap((action) => {
        const { name, surname, phone, email, password } = action;
        return this.authService
          .signUp({ name, surname, phone, email, password })
          .pipe(
            switchMap((result: any) => {
              return [SignupSuccess(result)];
            }),
            catchError((err: HttpErrorResponse) => of(SignupFailure(err)))
          );
      })
    )
  );

  initAuthFromLocalStorage = createEffect(() =>
    this.actions.pipe(
      ofType(InitAuthFromLocalStorage),
      mergeMap((action) => {
        if (!!this.localStorageService.getItem<string>('uid')) {
          // Get Current User
          return [];
        }
        // Logout
        return [Logout()];
      })
    )
  );

  init = createEffect(() =>
    this.actions.pipe(
      ofType(ROOT_EFFECTS_INIT),
      mergeMap(() => [InitAuthFromLocalStorage()])
    )
  );
}
