import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { CoreModule } from '../core.module';
import { Category } from 'src/app/shared/models';

@Injectable({
  providedIn: CoreModule
})
export class CategoriesService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Category[]> {
    return this.http.get<Category[]>('/api/category');
  }

}
