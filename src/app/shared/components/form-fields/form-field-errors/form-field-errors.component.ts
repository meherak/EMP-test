import { AbstractControl, FormControl } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';

import { FORM_FIELD_DEFAULT_ERRORS_MSG } from '@shared/utils';

@Component({
  selector: 'emp-form-field-errors',
  templateUrl: './form-field-errors.component.html',
  styleUrls: ['./form-field-errors.component.scss'],
})
export class FormFieldErrorsComponent implements OnInit {
  // Custom Server Error
  @Input() serverErrorMsg = '';

  @Input() control: AbstractControl = new FormControl();

  private _errorMessages: { [key: string]: string } = {};
  get errorMessages(): { [key: string]: string } {
    return this._errorMessages;
  }
  @Input() set errorMessages(value: { [key: string]: string }) {
    this._errorMessages = { ...value, ...FORM_FIELD_DEFAULT_ERRORS_MSG };
  }

  constructor() {}

  ngOnInit(): void {}
}
