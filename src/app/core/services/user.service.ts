import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';

import { User } from '@shared/models';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private dbPath = '/users';

  constructor(private readonly angularFirestore: AngularFirestore) {}

  getAll(): Observable<User[]> {
    return this.angularFirestore.collection<User>('users').valueChanges({idField: 'uid'});
  }

  create(user: Partial<User>): any {
    return this.angularFirestore.collection(this.dbPath).add({ ...user });
  }

  delete(uid: string): Promise<void> {
    return this.angularFirestore.doc<User>('users/' + uid).delete();
  }
}
