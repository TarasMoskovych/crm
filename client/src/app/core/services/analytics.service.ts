import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { CoreModule } from './../core.module';
import { Analytic, Overview } from 'src/app/shared/models';
import { hadleHttpError } from 'src/app/shared/services/helpers';

@Injectable({
  providedIn: CoreModule
})
export class AnalyticsService {

  constructor(private http: HttpClient) { }

  getOverview(): Observable<Overview> {
    return this.http.get<Overview>('/api/analytic/overview').pipe(catchError(hadleHttpError));
  }

  getAnalytics(): Observable<Analytic> {
    return this.http.get<Analytic>('/api/analytic/analytics').pipe(catchError(hadleHttpError));
  }

}
