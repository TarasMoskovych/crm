import { Component, OnInit, Input, ChangeDetectionStrategy, OnChanges, ViewChild, ElementRef, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { MaterialService } from 'src/app/shared/services';
import { Category } from 'src/app/shared/models';

@Component({
  selector: 'app-categories-form',
  templateUrl: './categories-form.component.html',
  styleUrls: ['./categories-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class CategoriesFormComponent implements OnInit, OnChanges, AfterViewInit {
  @Input() create: boolean;
  @Input() category: Category;
  @Input() savedCategory: Category;
  @Output() save = new EventEmitter<{ category: Category, file: File }>();
  @Output() remove = new EventEmitter<Category>();
  @ViewChild('file') file: ElementRef;
  @ViewChild('removeCategory') removeCategory: ElementRef;

  img: File;
  imgPreview: any;
  form: FormGroup;

  constructor() { }

  ngOnInit() {
    this.buildForm();
    // MaterialService.
  }

  ngOnChanges() {
    this.reinitForm();
    this.clearForm();
  }

  ngAfterViewInit() {
    MaterialService.initializeModal(this.removeCategory);
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
    const reader = new FileReader();

    this.img = file;

    reader.onload = () => {
      this.imgPreview = reader.result;
    };

    reader.readAsDataURL(file);
  }

  onRemoveCategory() {
    this.remove.emit(this.category);
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
