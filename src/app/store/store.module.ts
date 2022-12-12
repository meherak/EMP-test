import { NgModule } from '@angular/core';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { appEffects } from './effects';
import { environment } from '@environments/environment';
import { reducers, metaReducers } from '@store/app.state';

@NgModule({
  declarations: [],
  imports: [
    // NgRx Store Module Loader
    EffectsModule.forRoot(appEffects),
    StoreModule.forRoot(reducers, {
      metaReducers,
      runtimeChecks: {
        strictActionImmutability: true,
        strictStateImmutability: true,
      },
    }),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      name: 'Energy Market Price Store',
      logOnly: !environment.production,
    }),
  ],
  exports: [],
})
export class NgrxStoreModule {}
