import {
  Component,
  OnInit,
  AfterViewInit,
  ViewChild,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter
} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ModalComponent } from 'src/app/shared/components';
import { MaterialService } from 'src/app/shared/services';
import { Modal, Position } from 'src/app/shared/models';

@Component({
  selector: 'app-positions-form',
  templateUrl: './positions-form.component.html',
  styleUrls: ['./positions-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class PositionsFormComponent implements OnInit, AfterViewInit {
  @Input() positions: Position[];
  @Output() save = new EventEmitter<{ position: Position, resolve: () => void, complete: (e: string) => void }>();
  @Output() remove = new EventEmitter<Position>();
  @ViewChild(ModalComponent) modal: Modal;

  form: FormGroup;
  id: string;

  constructor() { }

  ngOnInit() {
    this.buildForm();
  }

  ngAfterViewInit() {
    MaterialService.reinitInputs();
  }

  onSubmit() {
    let position = this.form.value;
    const resolve = () => this.modal.close();
    const complete = (msg: string) => {
      this.form.enable();
      this.populateForm({ name: null, cost: 1 });
      MaterialService.reinitInputs();
      MaterialService.toast(msg);
    };

    if (this.id) { position = { ...position, _id: this.id }; }

    this.form.disable();
    this.save.emit({ position, resolve, complete });
  }

  onPositionAdd() {
    this.populateForm({ name: null, cost: 1 });
    this.id = null;
    this.modal.open();
  }

  onPositionUpdate(position: Position) {
    this.populateForm(position);
    this.id = position._id;
    this.modal.open();
  }

  onPositionRemove(e: Event, position: Position) {
    // @TODO: Add confirm modal
    e.stopPropagation();
    this.remove.emit(position);
  }

  private buildForm() {
    this.form = new FormGroup({
      name: new FormControl(null, Validators.required),
      cost: new FormControl(1, [Validators.required, Validators.min(1)])
    });
  }

  private populateForm({ name, cost }: Position) {
    this.form.reset({ name, cost });
    MaterialService.reinitInputs();
  }

}
