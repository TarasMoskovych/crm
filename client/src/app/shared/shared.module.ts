import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CommonModule } from '@angular/common';

import {
  ActionButtonComponent,
  LoaderComponent,
  ModalComponent ,
  DatePickerComponent
} from './components';
import { TooltipDirective } from './directives';

@NgModule({
  declarations: [
    ActionButtonComponent,
    LoaderComponent,
    ModalComponent,
    TooltipDirective,
    DatePickerComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    ActionButtonComponent,
    LoaderComponent,
    ModalComponent,
    TooltipDirective,
    DatePickerComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SharedModule { }
