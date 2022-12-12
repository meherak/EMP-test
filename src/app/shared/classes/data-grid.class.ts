export class DataGridOptions {
  public showActionColumn: boolean;

  public actions: {
    showEditButton: boolean;
    showDeleteButton: boolean;
    enableActionsTemplate: boolean;
  };

  constructor() {
    this.showActionColumn = true;

    this.actions = {
      showEditButton: true,
      showDeleteButton: true,
      enableActionsTemplate: false,
    };
  }
}
