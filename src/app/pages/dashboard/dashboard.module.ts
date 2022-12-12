import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@shared/shared.module';
import { DashboardRoutingModule } from './dashboard-routing.module';

import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { LayoutComponent } from './layout/layout.component';
import { NotFoundComponent } from './not-found/not-found.component';

const declarations = [
  HomeComponent,
  LayoutComponent,
  HeaderComponent,
  NotFoundComponent,
];

@NgModule({
  declarations: [...declarations],
  imports: [
    CommonModule,
    SharedModule,
    DashboardRoutingModule,
  ],
})
export class DashboardModule {}
