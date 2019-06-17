import { Component, ViewChild, ElementRef, AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { first } from 'rxjs/operators';
import { Chart } from 'chart.js';

import { Analytic, AnalyticChart } from 'src/app/shared/models';
import { AnalyticsService } from 'src/app/core/services';

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AnalyticsComponent implements AfterViewInit {
  @ViewChild('gain') gain: ElementRef;
  @ViewChild('order') order: ElementRef;

  average: number;
  pending = true;

  constructor(
    private analyticsService: AnalyticsService,
    private cdr: ChangeDetectorRef
  ) { }

  ngAfterViewInit() {
    this.analyticsService.getAnalytics().pipe(first()).subscribe((analytic: Analytic) => {
      const labels = analytic.chart.map((item: AnalyticChart) => item.label);

      this.average = analytic.average;

      this.createChart(this.gain, {
        labels,
        data: analytic.chart.map((item: AnalyticChart) => item.gain),
        label: 'Gain',
        color: 'rgb(255, 99, 132)',
      });

      this.createChart(this.order, {
        labels,
        data: analytic.chart.map((item: AnalyticChart) => item.order),
        label: 'Orders',
        color: 'rgb(54, 162, 235)',
      });

      this.pending = false;
      this.cdr.detectChanges();
    });
  }

  private createChart(elementRef: ElementRef, { labels, data, label, color }) {
    const ctx = elementRef.nativeElement.getContext('2d');
    ctx.canvas.height = '300px';

    return new Chart(ctx, {
      type: 'line',
      options: {
        responsive: true
      },
      data: {
        labels,
        datasets: [
          {
            label, data,
            borderColor: color,
            steppedLine: false,
            fill: false
          }
        ]
      }
    });
  }

}
