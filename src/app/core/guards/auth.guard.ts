import {
  Router,
  CanActivate,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
// import { lastValueFrom, map } from 'rxjs';
import { Injectable } from '@angular/core';

// import { AngularFireAuth } from '@angular/fire/compat/auth';
import { LocalStorageService } from '@core/services';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private readonly router: Router,
    private readonly localStorageService: LocalStorageService
  ) // private readonly angularFireAuth: AngularFireAuth
  {}

  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> {
    // const source = this.angularFireAuth.authState.pipe(
    //   map((result) => !!result)
    // );

    // return await lastValueFrom(source).then(
    //   (isAuth: boolean) => {
    //     console.log('isAuth => ', isAuth);
    //     if (!isAuth) {
    //       this.router.navigateByUrl('auth/login');
    //     }
    //     return true;
    //   }
    // );

    const uid = !!this.localStorageService.getItem<string>('uid');
    if (!uid) {
      this.router.navigateByUrl('auth/login');
    }
    return true;
  }
}
