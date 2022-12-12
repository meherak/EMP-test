import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InputComponent, FormFieldErrorsComponent } from './';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const components = [
  InputComponent,
  FormFieldErrorsComponent
];

const modules = [
  FormsModule,
  ReactiveFormsModule
];

@NgModule({
  declarations: [
    ...components
  ],
  imports: [
    CommonModule,
    ...modules
  ],
  exports: [
    ...components,
    ...modules
  ]
})
export class FormFieldsModule { }
