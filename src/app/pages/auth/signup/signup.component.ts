import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { Actions, ofType } from '@ngrx/effects';

import {
  Signup,
  SignupSuccess,
  SignupFailure,
  AUTH_ACTIONS_TYPE,
} from '@store/actions';
import { PATTERNS } from '@shared/utils';
import { SignupPayload } from '@shared/models';
import { getAuthLoading } from '@store/selectors';
import { BaseComponent } from '@shared/components/base.component';


@Component({
  selector: 'emp-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent extends BaseComponent implements OnInit {
  public error = '';
  public submitted = false;
  public signupForm: FormGroup = new FormGroup({});
  public loading: Observable<boolean> = this.store.select(getAuthLoading);

  constructor(
    private readonly store: Store,
    private readonly router: Router,
    private readonly dispatcher: Actions
  ) {
    super();
  }

  get form(): FormGroup {
    return this.signupForm;
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

    const payload: SignupPayload = this.form.value;
    this.store.dispatch(Signup(payload));
  }

  private initForm(): void {
    this.signupForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      surname: new FormControl('', [Validators.required]),
      phone: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(8),
        Validators.pattern(PATTERNS.DIGIT)
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.pattern(PATTERNS.EMAIL),
      ]),
      password: new FormControl('', [Validators.required]),
    });
  }

  private listenToAuthActions(): void {
    this.subscriptions.push(
      this.dispatcher
        .pipe(ofType(SignupSuccess, SignupFailure))
        .subscribe((action: any) => {
          this.submitted = false;
          if (action.type === AUTH_ACTIONS_TYPE.SIGNUP_SUCCESS) {
            this.router.navigateByUrl('auth/login').then(
              () => window.location.reload()
            );
          } else if (action.type === AUTH_ACTIONS_TYPE.SIGNUP_FAILURE) {
            this.error = 'Error, try again';
          }
        })
    );
  }
}
