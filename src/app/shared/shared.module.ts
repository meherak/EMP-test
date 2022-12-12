import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ToastModule } from 'primeng/toast';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

import { KeyedTemplateDirective } from './directives';
import {
  FormFieldsModule,
  ButtonComponent,
  DataGridComponent,
} from './components';

const pipes: any[] = [];
const modules: any[] = [
  FormFieldsModule,

  TableModule,
  ToastModule,
  ButtonModule,
  InputTextModule,
  ConfirmDialogModule,
];
const components: any[] = [ButtonComponent, DataGridComponent];
const directives: any[] = [KeyedTemplateDirective];

@NgModule({
  declarations: [...pipes, ...components, ...directives],
  imports: [...modules, CommonModule],
  exports: [...pipes, ...modules, ...components, ...directives],
})
export class SharedModule {}
