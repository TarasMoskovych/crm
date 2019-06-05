import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';

import { CategoriesService, PositionsService } from 'src/app/core/services';
import { Category, Position, Message } from 'src/app/shared/models';
import { MaterialService } from 'src/app/shared/services';

@Component({
  selector: 'app-categories-actions',
  template: `
    <app-categories-form
      (save)="onSaveCategory($event)"
      (remove)="onRemoveCategory($event)"
      [create]="create"
      [category]="category"
      [savedCategory]="savedCategory">
    </app-categories-form>
    <app-positions-form
      *ngIf="category"
      (save)="onSavePosition($event)"
      (remove)="onRemovePosition($event)"
      [positions]="positions"
    ></app-positions-form>
  `,
  styleUrls: ['./categories-actions.component.scss']
})
export class CategoriesActionsComponent implements OnInit {
  id: string;
  category: Category;
  savedCategory: Category;
  positions: Position[];
  create = true;

  constructor(
    private categoriesService: CategoriesService,
    private positionsService: PositionsService,
    private activatedRouter: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.getCategory();
  }

  onSaveCategory({ category, file }) {
    let s$: Observable<Category>;

    if (this.create) {
      s$ = this.categoriesService.create(category.name, file);
    } else {
      s$ = this.categoriesService.update(this.id, category.name, file);
    }

    s$.pipe(first()).subscribe((newCategory: Category) => {
      this.savedCategory = newCategory;

      if (this.create) {
        this.router.navigate([`/categories/${newCategory._id}`]);
      }
    });
  }

  onRemoveCategory(category: Category) {
    this.categoriesService.remove(category._id)
      .pipe(first())
      .subscribe((response: Message) => {
        MaterialService.toast(response.message);
        this.router.navigate(['/categories']);
      });
  }

  onSavePosition({ position, resolve, complete }) {
    const isUpdated = !!position._id;
    const method = isUpdated ? 'update' : 'create';

    this.positionsService[method]({ ...position, category: this.category._id })
      .pipe(first())
      .subscribe(
        (data: Position) => {
          isUpdated ? this.updatePositions(position, data) : this.positions = [...this.positions, data];
          resolve(data.name);
          complete(`Position ${data.name} was ${isUpdated ? 'updated' : 'created'}!`);
        },
        (e: HttpErrorResponse) => complete(e.message)
      );
  }

  onRemovePosition(position: Position) {
    this.positionsService.remove(position)
      .pipe(first())
      .subscribe((data: Message) => {
        MaterialService.toast(data.message);
        this.updatePositions(position);
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
        this.getPositions();
      });
  }

  private getPositions() {
    this.positionsService.getAllByCategoryId(this.category._id)
      .pipe(first())
      .subscribe((positions: Position[]) => {
        this.positions = positions;
      });
  }

  private updatePositions(position: Position, updated?: Position) {
    const idx = this.positions.findIndex((p: Position) => p._id === position._id);

    if (idx > -1) {
      updated ? this.positions.splice(idx, 1, updated) : this.positions.splice(idx, 1);

      this.positions = [...this.positions];
    }
  }

}
