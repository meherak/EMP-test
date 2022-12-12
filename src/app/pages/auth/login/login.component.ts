import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { Actions, ofType } from '@ngrx/effects';

import { PATTERNS } from '@shared/utils';
import { LoginPayload } from '@shared/models';
import { getAuthLoading } from '@store/selectors';
import { BaseComponent } from '@shared/components/base.component';
import { AUTH_ACTIONS_TYPE, Login, LoginFailure, LoginSuccess } from '@store/actions';

@Component({
  selector: 'emp-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent extends BaseComponent implements OnInit {
  public error = '';
  public submitted = false;
  public loginForm: FormGroup = new FormGroup({});
  public loading: Observable<boolean> = this.store.select(getAuthLoading);

  constructor(
    private readonly store: Store,
    private readonly router: Router,
    private readonly dispatcher: Actions
  ) {
    super();
  }

  get form(): FormGroup {
    return this.loginForm;
  }

  public ngOnInit(): void {
    this.initForm();
    this.listenToAuthActions();
  }

  public onSubmit(): void {
    if (this.submitted) {
      return;
    }

    this.error = '';
    this.submitted = true;

    const payload: LoginPayload = this.form.value;
    this.store.dispatch(Login(payload));
  }

  private initForm(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.pattern(PATTERNS.EMAIL),
      ]),
      password: new FormControl('', [Validators.required]),
    });
  }

  private listenToAuthActions(): void {
    this.subscriptions.push(
      this.dispatcher.pipe(
        ofType(
          LoginFailure, LoginSuccess
        )
      ).subscribe(
        (action: any) => {
          this.submitted = false;
          if (action.type === AUTH_ACTIONS_TYPE.LOGIN_SUCCESS) {
            this.router.navigateByUrl('dashboard')
            .then(
              () => window.location.reload()
            );
          } else if (action.type === AUTH_ACTIONS_TYPE.LOGIN_FAILURE) {
            this.error = 'User or Email nor found';
          }
        }
      )
    )
  }
}
