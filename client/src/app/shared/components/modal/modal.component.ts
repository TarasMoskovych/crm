import { Component, ChangeDetectionStrategy, Input, AfterViewInit, ViewChild, ElementRef } from '@angular/core';

import { MaterialService } from '../../services';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ModalComponent implements AfterViewInit {
  @Input() modalId: string;
  @ViewChild('modal') modal: ElementRef;

  ngAfterViewInit() {
    MaterialService.initializeModal(this.modal);
  }

}
