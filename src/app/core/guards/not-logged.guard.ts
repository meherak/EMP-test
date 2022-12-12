import {
  Router,
  CanActivate,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { Injectable } from '@angular/core';

import { LocalStorageService } from '@core/services';

@Injectable({
  providedIn: 'root',
})
export class NotLoggedGuard implements CanActivate {
  constructor(
    private readonly router: Router,
    private readonly localStorageService: LocalStorageService
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean{
    const uid = !!this.localStorageService.getItem<string>('uid');
    if (uid) {
      this.router.navigateByUrl('dashboard/home');
    }
    return true;
  }
}
