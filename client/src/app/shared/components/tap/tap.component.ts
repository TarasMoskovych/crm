import { Component, ChangeDetectionStrategy, AfterViewInit, OnDestroy, ViewChild, ElementRef, Input } from '@angular/core';

import { Tap } from 'src/app/shared/models';
import { MaterialService } from 'src/app/shared/services';

@Component({
  selector: 'app-tap',
  templateUrl: './tap.component.html',
  styleUrls: ['./tap.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TapComponent implements AfterViewInit, OnDestroy {
  @Input() dataTarget: string;
  @ViewChild('ref') ref: ElementRef;

  tap: Tap;

  ngAfterViewInit() {
    this.tap = MaterialService.initializeTap(this.ref);
  }

  ngOnDestroy() {
    this.destroy();
  }

  open() {
    this.tap.open();
  }

  close() {
    this.tap.close();
  }

  destroy() {
    this.tap.destroy();
  }

}
