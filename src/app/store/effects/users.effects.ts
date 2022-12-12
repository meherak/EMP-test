import { Injectable } from '@angular/core';
import { catchError, mergeMap, of, switchMap } from 'rxjs';
import { createEffect, Actions, ofType } from '@ngrx/effects';

import {
  GetAllUsers,
  GetAllUsersFailure,
  GetAllUsersSuccess,
} from '@store/actions';
import { User } from '@shared/models';
import { UserService } from '@core/services';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class UserEffects {
  constructor(
    private readonly actions: Actions,
    private readonly userService: UserService
  ) {}

  getAll = createEffect(() =>
    this.actions.pipe(
      ofType(GetAllUsers),
      mergeMap(() => {
        return this.userService.getAll().pipe(
          switchMap((result: User[]) => {
            return [GetAllUsersSuccess({ result })];
          }),
          catchError((err: HttpErrorResponse) =>
            of(GetAllUsersFailure({ error: err.error }))
          )
        );
      })
    )
  );
}
