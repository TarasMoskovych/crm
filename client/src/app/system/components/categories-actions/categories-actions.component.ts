import { MaterialService } from 'src/app/shared/services';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';

import { CategoriesService } from 'src/app/core/services';
import { Category, Message } from 'src/app/shared/models';

@Component({
  selector: 'app-categories-actions',
  template: `
    <app-categories-form
      (save)="onSave($event)"
      (remove)="onRemove($event)"
      [create]="create"
      [category]="category"
      [savedCategory]="savedCategory">
    </app-categories-form>
  `,
  styleUrls: ['./categories-actions.component.scss']
})
export class CategoriesActionsComponent implements OnInit {
  // <app-positions-form></app-positions-form>
  id: string;
  category: Category;
  savedCategory: Category;
  create = true;

  constructor(
    private categoriesService: CategoriesService,
    private activatedRouter: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.getCategory();
  }

  onSave({ category, file }) {
    let s$: Observable<Category>;

    if (this.create) {
      s$ = this.categoriesService.create(category.name, file);
    } else {
      s$ = this.categoriesService.update(this.id, category.name, file);
    }

    s$.pipe(first()).subscribe((newCategory: Category) => {
      this.savedCategory = newCategory;
    });
  }

  onRemove(category: Category) {
    this.categoriesService.remove(category._id)
      .pipe(first())
      .subscribe((response: Message) => {
        MaterialService.toast(response.message);
        this.router.navigate(['/categories']);
      });
  }

  private getCategory() {
    this.id = this.activatedRouter.snapshot.params.id;
    this.create = !this.id;

    if (this.create) { return; }

    this.categoriesService.getById(this.id)
      .pipe(first())
      .subscribe((category: Category) => {
        this.category = category;
      });
  }

}
