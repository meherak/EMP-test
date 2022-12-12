import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';

import { select, Store } from '@ngrx/store';

import { AppState } from '@store/app.state';
import { DataGridOptions } from '@shared/classes';
import { BaseComponent } from '@shared/components/base.component';
import { DataGridColumn, PTableInputs, User } from '@shared/models';
import {
  getAllUsers,
  getUsersLoadedState,
  getUsersLoadingState,
} from '@store/selectors';
import { GetAllUsers } from '@store/actions';
import { UserService } from '@core/services';

@Component({
  selector: 'emp-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent extends BaseComponent implements OnInit {
  public totalRecords: number;
  public dataSource: User[] = [];
  public columns: DataGridColumn[] = [
    { field: 'name', header: 'Name' },
    { field: 'surname', header: 'Surname' },
    { field: 'phone', header: 'Téléphone', cellTemplate: 'phoneCellTemplate' },
    { field: 'email', header: 'E-mail' },
  ];
  public dataGridOptions: DataGridOptions = new DataGridOptions();
  public loading: Observable<boolean> = this.store.select(getUsersLoadingState);

  public pTableInputs: Partial<PTableInputs> = {
    dataKey: 'uid',
  };

  constructor(
    private readonly store: Store<AppState>,
    private readonly userService: UserService,
  ) {
    super();
  }

  ngOnInit(): void {
    this.getData();
  }

  onDeleteActionFired(item: User): void {
    this.userService.delete(item.uid).then();
  }

  private getData(): void {
    this.subscriptions.push(
      this.store.select(getUsersLoadedState).subscribe((state: boolean) => {
        if (!state) {
          return this.store.dispatch(GetAllUsers());
        }
      }),
      this.store.select(getAllUsers).subscribe((data: User[]) => {
        this.dataSource = data;
        this.totalRecords = data.length;
      })
    );
  }
}
