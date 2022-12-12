import { PTableInputs } from '@shared/models';

export const DEFAULT_TABLE_INPUTS: PTableInputs = {
  rows: 10,
  lazy: false,
  dataKey: 'id',
  rowHover: true,
  paginator: true,
  showLoader: true,
  autoLayout: false,
  resizableColumns: false,
  showFirstLastIcon: true,
  selectionMode: 'single',
  exportFilename: 'download',
  columnResizeMode: 'expand',
  reorderableColumns: false,
  showCurrentPageReport: false,
  rowsPerPageOptions: [10, 25, 50, 100],
  currentPageReportTemplate:
    'Résultats de {first} à {last} sur {totalRecords}',
};