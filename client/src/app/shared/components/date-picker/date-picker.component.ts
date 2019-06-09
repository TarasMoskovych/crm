import {
  Component,
  Input,
  AfterViewInit,
  OnDestroy,
  ElementRef,
  ViewChild,
  ChangeDetectionStrategy,
  Output,
  EventEmitter
} from '@angular/core';

import { DatePicker } from 'src/app/shared/models';
import { MaterialService } from 'src/app/shared/services';

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DatePickerComponent implements AfterViewInit, OnDestroy {
  @Input() inputId: string;
  @Input() labelText: string;
  @Output() closeDatePicker = new EventEmitter<Date>();
  @ViewChild('ref') ref: ElementRef;

  datePicker: DatePicker;

  ngAfterViewInit() {
    this.datePicker = MaterialService.initializeDatePicker(this.ref, this.onClose.bind(this));
  }

  ngOnDestroy() {
    this.destroy();
  }

  onClose() {
    this.closeDatePicker.emit(this.datePicker.date);
  }

  open() {
    this.datePicker.open();
  }

  close() {
    this.datePicker.close();
  }

  destroy() {
    this.datePicker.destroy();
  }

}
