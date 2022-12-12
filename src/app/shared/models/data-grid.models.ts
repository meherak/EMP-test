import { FilterMetadata } from 'primeng/api';

export interface DataGridColumn {
  /** Specifies the identifier of the column. */
  field: string;

  /** Specifies the type of the column. */
  type?: string;

  /** Specifies a header Caption for the column */
  header: string;

  /** Specifies Column Filter to be visible/hidden  */
  enableCellFilter?: boolean;

  /** Specifies data for column filter  */
  customizeCellFilter?: {
    type?: string;
    field?: string;
    matchMode?: string;
    showMenu?: boolean;
    placeholder?: string;
    showOperator?: boolean;
    showAddButton?: boolean;
    showMatchModes?: boolean;
    display?: 'menu' | 'row';

    customCellFilterTemplate?: string; // if there is template from child component, this variable should be the name
    // templateData?: any;
  };

  /** Specifies a CSS class to be applied to the column. */
  cssClass?: string;

  /** Specifies displayed expression for the column if field is Object */
  displayExpr?: string;

  /** Specifies whether the column is visible, that is, occupies space in the table. */
  selected?: boolean;

  /** Specifies a custom template to the column. */
  cellTemplate?: string;

  /** Specifies whether the column is frozen or not. */
  frozen?: boolean;

  /** Specifies whether the column is sortable or not */
  sortable?: boolean;

  /** Specifies whether the column is exportable or not */
  exportable?: boolean;
}

export interface PTableInputs {
  lazy: boolean;
  dataKey: string;
  stateKey?: string;
  loading?: boolean;
  rowHover: boolean;
  contextMenu?: any;
  editMode?: string;
  autoLayout: boolean;
  minBufferPx?: number;
  maxBufferPx?: number;
  showLoader: boolean;
  loadingIcon?: string;
  customSort?: boolean;
  exportFunction?: any;
  frozenWidth?: string;
  scrollable?: boolean;
  scrollHeight?: string;
  rowExpandMode?: string;
  exportFilename: string;
  virtualScroll?: boolean;
  columnResizeMode: string;
  resizableColumns: boolean;
  virtualRowHeight?: number;
  virtualScrollDelay?: number;
  reorderableColumns: boolean;
  stateStorage?: 'session' | 'local';
  selectionMode: 'multiple' | 'single';

  rows: number;
  pageLinks?: number;
  paginator: boolean;
  rowsPerPageOptions: any[];
  paginatorPosition?: string;
  alwaysShowPaginator?: boolean;
  paginatorDropdownAppendTo?: any;
  paginatorDropdownScrollHeight?: string;

  showFirstLastIcon: boolean;
  showCurrentPageReport: boolean;
  currentPageReportTemplate: string;
}

export interface DataGridLazyLoadEvent {
  first?: number;
  rows?: number;
  sortField?: string;
  sortOrder?: number;
  // multiSortMeta?: SortMeta[];
  filters?: {
    [s: string]: FilterMetadata;
  };
  globalFilter?: any;
  // filters: {
  //     [s: string]: FilterMetadata | undefined;
  // };
}

export interface DataGridPageChangeEvent {
  rows: number;
  page: number;
  first: number;
  pageCount: number;
}

export interface RowPerPageChangeEvent {
  page: number;
  rows: number;
  first: number;
  pageCount: number;
}

export type LoadDataType = 'serverSide' | 'templateSide';