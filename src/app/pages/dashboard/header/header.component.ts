import { Router } from '@angular/router';
import { Component } from '@angular/core';

import { Store } from '@ngrx/store';

import { Logout } from '@store/actions';
import { AppState } from '@store/app.state';
import { AuthService } from '@core/services';

@Component({
  selector: 'emp-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent {  
  constructor(
    private readonly router: Router,
    private readonly store: Store<AppState>,
    private readonly authService: AuthService,
  ) {}

  public logout(): void {
    this.authService.logout().then(() => {
      this.store.dispatch(Logout())
      this.router.navigateByUrl('auth/login').then(
        () => window.location.reload()
      );
    });
  }
}
