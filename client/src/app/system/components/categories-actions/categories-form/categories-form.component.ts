import {
  Component,
  Input,
  ViewChild,
  Output,
  OnInit,
  OnChanges,
  OnDestroy,
  ChangeDetectionStrategy,
  ElementRef,
  EventEmitter,
  ChangeDetectorRef
} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

import { MaterialService } from 'src/app/shared/services';
import { Category } from 'src/app/shared/models';
import { ImageService } from 'src/app/core/services';

@Component({
  selector: 'app-categories-form',
  templateUrl: './categories-form.component.html',
  styleUrls: ['./categories-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoriesFormComponent implements OnInit, OnChanges, OnDestroy {
  @Input() create: boolean;
  @Input() category: Category;
  @Input() savedCategory: Category;
  @Output() save = new EventEmitter<{ category: Category, file: File }>();
  @Output() remove = new EventEmitter<Category>();
  @ViewChild('file') file: ElementRef;

  private s$: Subscription;

  img: File;
  imgPreview: any;
  form: FormGroup;

  constructor(
    private imageService: ImageService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.buildForm();
    this.onFileUploading();
  }

  ngOnChanges() {
    this.reinitForm();
    this.clearForm();
  }

  ngOnDestroy() {
    if (this.s$) { this.s$.unsubscribe(); }
  }

  onSubmit() {
    this.form.disable();
    this.save.emit({ category: this.form.value, file: this.img });
  }

  onFileInputClick() {
    this.file.nativeElement.click();
  }

  onFileUpload(e: Event) {
    const file = (e.target as HTMLInputElement).files[0];

    if (!file) { return; }

    this.imageService.uploadFile(file);
    this.img = file;
  }

  onRemoveCategory() {
    this.remove.emit(this.category);
  }

  private onFileUploading() {
    this.s$ = this.imageService.channel$.subscribe((data: FileReader) => {
      this.imgPreview = data;
      this.cdr.detectChanges();
    });
  }

  private reinitForm() {
    if (!this.create && this.form) {
      this.form.disable();
    }

    if (this.category) {
      this.populateForm(this.category);
      MaterialService.reinitInputs();
    }
  }

  private clearForm() {
    if (this.savedCategory) {
      this.category = this.savedCategory;
      this.form.enable();
      this.imgPreview = this.savedCategory.imageSrc;

      MaterialService.toast(`Category ${this.savedCategory.name} was ${this.create ? 'added' : 'updated'}.`);
    }
  }

  private buildForm() {
    this.form = new FormGroup({
      name: new FormControl(null, Validators.required)
    });
  }

  private populateForm(category: Category) {
    this.imgPreview = category.imageSrc;
    this.form.setValue({
      name: category.name
    });
    this.form.enable();
  }

}
