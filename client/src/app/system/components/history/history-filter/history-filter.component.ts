import { Component, EventEmitter, Output, ChangeDetectionStrategy } from '@angular/core';

import { Filter } from 'src/app/shared/models';

@Component({
  selector: 'app-history-filter',
  templateUrl: './history-filter.component.html',
  styleUrls: ['./history-filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HistoryFilterComponent {
  @Output() filter = new EventEmitter<Filter>();

  order: number;
  isDateValid = true;
  startDate: Date;
  endDate: Date;

  onFilterApply() {
    const obj: Filter = {};

    if (this.order) { obj.order = this.order; }
    if (this.startDate) { obj.start = this.startDate; }
    if (this.endDate) { obj.end = this.startDate; }

    this.filter.emit(obj);
  }

  selectStartDate(date: Date) {
    this.startDate = date;
    this.validate();
  }

  selectEndDate(date: Date) {
    this.endDate = date;
    this.validate();
  }

  private validate() {
    if (!this.startDate || !this.endDate) { return this.isDateValid = true; }

    this.isDateValid = this.startDate < this.endDate;
  }

}
