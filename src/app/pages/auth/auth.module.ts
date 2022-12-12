import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@shared/shared.module';

import { AuthRoutingModule } from './auth-routing.module';

import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { LayoutComponent } from './layout/layout.component';

const declaration = [
  LoginComponent,
  SignupComponent,
  LayoutComponent,
];

@NgModule({
  declarations: [...declaration],
  imports: [CommonModule, SharedModule, AuthRoutingModule],
})
export class AuthModule {}
