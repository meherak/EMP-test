import {
  Input,
  OnInit,
  Output,
  Component,
  ViewChild,
  OnChanges,
  TemplateRef,
  EventEmitter,
  SimpleChanges,
} from '@angular/core';
import { Observable } from 'rxjs';

import { Table } from 'primeng/table';

import { PTableInputs, DataGridColumn } from '@shared/models';
import { LoadDataType } from '@shared/models';
import { DataGridOptions } from '@shared/classes';
import { DEFAULT_TABLE_INPUTS } from '@shared/constants';
import { TemplateHostComponent } from '@shared/interfaces';
import { KeyedTemplateDirective } from '@shared/directives';
import { BaseComponent } from '@shared/components/base.component';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'emp-data-grid',
  templateUrl: './data-grid.component.html',
  styleUrls: ['./data-grid.component.scss'],
})
export class DataGridComponent
  extends BaseComponent
  implements OnInit, OnChanges, TemplateHostComponent
{
  /** Page Title */
  @Input() pageTitle: string;

  /** Table Loading Indicator */
  @Input() loading: Observable<boolean>;

  /** Table Total Records */
  @Input() totalRecords: number;

  /** Table DataSource */
  @Input() dataSource: Array<any>;

  /** Load Data Type */
  @Input() loadDataType: LoadDataType = 'templateSide';

  /** DataGrid Input Options */
  private P_TABLE_INPUTS: PTableInputs;
  @Input() set pTableInputs(tableInputs: Partial<PTableInputs>) {
    this.P_TABLE_INPUTS = { ...DEFAULT_TABLE_INPUTS, ...tableInputs };
  }
  get pTableInputs(): PTableInputs {
    return this.P_TABLE_INPUTS || DEFAULT_TABLE_INPUTS;
  }

  /** DataGrid Columns */
  @Input() columns: DataGridColumn[];

  /** Page DataGrid options */
  @Input() dataGridOptions: DataGridOptions = new DataGridOptions();

  /** Fired when delete button handled  */
  @Output() deleteRow: EventEmitter<any> = new EventEmitter<any>();

  /** Local Variables */
  public selectedData: any[] = [];
  public selectedColumns: DataGridColumn[];
  public templateDirectiveMap: Map<string, any>;

  @ViewChild('dataGrid') public table: Table;

  constructor(
    private readonly messageService: MessageService,
    private readonly confirmationService: ConfirmationService
  ) {
    super();
  }

  public ngOnChanges(changes: SimpleChanges): void {}

  public ngOnInit(): void {
    this.initSelectedColumns();
  }

  public getTemplate(tplName: string): TemplateRef<any> {
    return this.templateDirectiveMap && this.templateDirectiveMap.has(tplName)
      ? this.templateDirectiveMap.get(tplName).templateDirective.template
      : undefined;
  }

  public registerTemplate = (
    key: string,
    templateDirective: KeyedTemplateDirective
  ): void => {
    if (!this.templateDirectiveMap) {
      this.templateDirectiveMap = new Map<string, KeyedTemplateDirective>();
    }

    const keyedTemplate = {
      [key]: key,
      templateDirective,
    };
    this.templateDirectiveMap.set(key, keyedTemplate);
  };

  public onSearchInput(event: any): void {
    this.table.filterGlobal(event.target.value, 'contains');
  }

  public onDeleteButtonHandled(item: any): void {
    this.confirmationService.confirm({
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      message: 'Voulez-vous vraiment supprimer cette utilisateur ?',
      accept: () => {
        this.deleteRow.emit(item);
        this.messageService.add({
          severity: 'success',
          summary: 'Succès',
          detail: 'Utilisateur Supprimé',
          life: 3000,
        });
      },
    });
  }

  private initSelectedColumns(): void {
    this.selectedColumns = this.columns.filter(
      (column: DataGridColumn) => column.selected
    );
  }
}
