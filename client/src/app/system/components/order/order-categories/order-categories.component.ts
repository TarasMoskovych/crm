import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { CategoriesService } from 'src/app/core/services';
import { Category } from 'src/app/shared/models';

@Component({
  selector: 'app-order-categories',
  templateUrl: './order-categories.component.html',
  styleUrls: ['./order-categories.component.scss']
})
export class OrderCategoriesComponent implements OnInit {
  categories$: Observable<Category[]>;

  constructor(private categoriesService: CategoriesService) { }

  ngOnInit() {
    this.getCategories();
  }

  private getCategories() {
    this.categories$ = this.categoriesService.getAll();
  }

}
