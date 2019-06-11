import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';

import { AnalyticsService } from 'src/app/core/services';
import { Overview } from 'src/app/shared/models';
import { TapComponent } from 'src/app/shared';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {
  @ViewChild(TapComponent) tapTarget: TapComponent;

  date = new Date();
  data$: Observable<Overview>;

  constructor(private analyticsService: AnalyticsService) { }

  ngOnInit() {
    this.getOverview();
    this.calculateDate();
  }

  openInfo() {
    this.tapTarget.open();
  }

  private getOverview() {
    this.data$ = this.analyticsService.getOverview();
  }

  private calculateDate() {
    this.date.setDate(this.date.getDate() - 1);
  }

}
