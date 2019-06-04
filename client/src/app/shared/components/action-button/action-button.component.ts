import { Component, ChangeDetectionStrategy, AfterViewInit, ViewChild, ElementRef } from '@angular/core';

import { MaterialService } from '../../services';

@Component({
  selector: 'app-action-button',
  templateUrl: './action-button.component.html',
  styleUrls: ['./action-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ActionButtonComponent implements AfterViewInit {
  @ViewChild('floatingButton') floatingButtonRef: ElementRef;

  ngAfterViewInit() {
    MaterialService.initializeFloatingButton(this.floatingButtonRef);
  }

}
