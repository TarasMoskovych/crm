import { Component, ChangeDetectionStrategy, Input, AfterViewInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';

import { MaterialService } from '../../services';
import { Modal } from 'src/app/shared/models';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ModalComponent implements AfterViewInit, OnDestroy {
  @Input() modalId: string;
  @Input() className = '';
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

  ngOnDestroy() {
    this.modal.destroy();
  }

}
