// import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';

// import { AppService } from '@core/services';
import { BaseComponent } from '@shared/components/base.component';

// import { AppState } from '@store/app.state';

@Component({
  selector: 'emp-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent extends BaseComponent implements OnInit {
  constructor() // private readonly appService: AppService,
  // private readonly store: Store<AppState>
  {
    super();
  }

  ngOnInit(): void {}
}
