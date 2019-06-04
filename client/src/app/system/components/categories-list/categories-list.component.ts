import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { delay } from 'rxjs/operators';

import { CategoriesService } from 'src/app/core/services';
import { Category } from 'src/app/shared/models';

@Component({
  selector: 'app-categories-list',
  templateUrl: './categories-list.component.html',
  styleUrls: ['./categories-list.component.scss']
})
export class CategoriesListComponent implements OnInit {
  categories$: Observable<Category[]>;

  constructor(private categoriesService: CategoriesService) { }

  ngOnInit() {

    this.getCategories();
  }

  getCategories() {
    this.categories$ = this.categoriesService.getAll();
  }

}
