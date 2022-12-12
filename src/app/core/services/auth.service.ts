import { from, Observable } from 'rxjs';
import { Injectable } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/compat/auth';

import { LoginPayload, SignupPayload } from '@shared/models';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private readonly userService: UserService, // Inject Firestore service
    private readonly angularFireAuth: AngularFireAuth // Inject Firebase auth service
  ) {}

  login(payload: LoginPayload): Observable<any> {
    return from(
      this.angularFireAuth.signInWithEmailAndPassword(
        payload.email,
        payload.password
      )
    );
  }

  signUp(payload: SignupPayload): Observable<any> {
    return from(
      this.angularFireAuth
        .createUserWithEmailAndPassword(payload.email, payload.password)
        .then((result) => {
          const { name, surname, phone, email } = payload;
          this.userService.create({ name, surname, phone, email });
          return result;
        })
    );
  }

  logout(): Promise<void> {
    return this.angularFireAuth.signOut();
  }
}
