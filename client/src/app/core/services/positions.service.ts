import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { CoreModule } from 'src/app/core/core.module';
import { Message, Position } from 'src/app/shared/models';
import { hadleHttpError } from 'src/app/shared/services/helpers';

@Injectable({
  providedIn: CoreModule
})
export class PositionsService {

  constructor(private http: HttpClient) { }

  getAllByCategoryId(id: string): Observable<Position[]> {
    return this.http.get<Position[]>(`/api/position/${id}`).pipe(catchError(hadleHttpError));
  }

  create(position: Position): Observable<Position> {
    return this.http.post<Position>('/api/position', position).pipe(catchError(hadleHttpError));
  }

  update(position: Position): Observable<Position> {
    return this.http.patch<Position>(`/api/position/${position._id}`, position).pipe(catchError(hadleHttpError));
  }

  remove(position: Position): Observable<Message> {
    return this.http.delete<Message>(`/api/position/${position._id}`).pipe(catchError(hadleHttpError));
  }

}
