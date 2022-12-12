import { Subscription } from 'rxjs';
import { Component, OnDestroy } from '@angular/core';

@Component({
  template: '',
  selector: 'emp-base',
})
export class BaseComponent implements OnDestroy {
  public subscriptions: Subscription[] = [];

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub: Subscription) => sub.unsubscribe());
  }
}
