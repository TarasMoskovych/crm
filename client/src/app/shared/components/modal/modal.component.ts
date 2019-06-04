import { Component, ChangeDetectionStrategy, Input, AfterViewInit, ViewChild, ElementRef } from '@angular/core';

import { MaterialService } from '../../services';
import { Modal } from 'src/app/shared/models';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ModalComponent implements AfterViewInit {
  @Input() modalId: string;
  @ViewChild('modal') modalRef: ElementRef;

  private modal: Modal;

  open() {
    this.modal.open();
  }

  close() {
    this.modal.close();
  }

  destroy() {
    this.modal.destroy();
  }

  ngAfterViewInit() {
    this.modal = MaterialService.initializeModal(this.modalRef);
  }

}
