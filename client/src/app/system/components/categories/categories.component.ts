import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { delay } from 'rxjs/operators';

import { CategoriesService } from 'src/app/core/services';
import { Category } from 'src/app/shared/models';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  categories$: Observable<Category[]>;

  constructor(private categoriesService: CategoriesService) { }

  ngOnInit() {

    this.getCategories();
  }

  getCategories() {
    this.categories$ = this.categoriesService.getAll().pipe(delay(1000));
  }

}
