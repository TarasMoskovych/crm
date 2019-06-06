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
  @Output() save = new EventEmitter<{ category: Category, file: File, callback: (msg: string, category: Category) => void }>();
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
    if (this.category) { this.populateForm(this.category); }
  }

  ngOnDestroy() {
    if (this.s$) { this.s$.unsubscribe(); }
  }

  onSubmit() {
    const callback = (msg?: string, category?: Category) => {
      this.form.enable();
      this.populateForm(category ? category: null);

      if (msg) { MaterialService.toast(msg); }
    };

    this.form.disable();
    this.save.emit({ category: this.form.value, file: this.img, callback });
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

  private buildForm() {
    this.form = new FormGroup({
      name: new FormControl(null, Validators.required)
    });
  }

  private populateForm(category?: Category) {
    this.form.enable();
    this.form.reset({ name: category ? category.name : null });
    MaterialService.reinitInputs();

    if (category) {
      this.imgPreview = category.imageSrc;
    }
  }

}
