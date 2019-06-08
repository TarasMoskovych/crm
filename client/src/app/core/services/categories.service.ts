import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { CoreModule } from '../core.module';
import { Category, Message } from 'src/app/shared/models';
import { hadleHttpError } from 'src/app/shared/services/helpers';

@Injectable({
  providedIn: CoreModule
})
export class CategoriesService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Category[]> {
    return this.http.get<Category[]>('/api/category').pipe(catchError(hadleHttpError));
  }

  getById(id: string): Observable<Category> {
    return this.http.get<Category>(`/api/category/${id}`).pipe(catchError(hadleHttpError));
  }

  create(name: string, image?: File): Observable<Category> {
    return this.http.post<Category>('/api/category', this.getFormData(name, image)).pipe(catchError(hadleHttpError));
  }

  update(id: string, name: string, image?: File): Observable<Category> {
    return this.http.patch<Category>(`/api/category/${id}`, this.getFormData(name, image)).pipe(catchError(hadleHttpError));
  }

  remove(id: string): Observable<Message> {
    return this.http.delete<Message>(`/api/category/${id}`).pipe(catchError(hadleHttpError));
  }

  private getFormData(name: string, image?: File): FormData {
    const formData = new FormData();

    if (image) { formData.append('image', image, image.name); }
    formData.append('name', name);

    return formData;
  }

}
