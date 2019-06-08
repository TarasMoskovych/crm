import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Subject, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { CoreModule } from 'src/app/core/core.module';
import { Position, OrderItem, Order } from 'src/app/shared/models';
import { hadleHttpError, calculateTotals } from 'src/app/shared/services/helpers';

@Injectable({
  providedIn: CoreModule
})
export class OrdersService {
  private channel = new Subject();
  private list: OrderItem[] = [];

  channel$ = this.channel.asObservable();

  constructor(private http: HttpClient) { }

  create(order: Order): Observable<Order> {
    return this.http.post<Order>('/api/order', order).pipe(catchError(hadleHttpError));
  }

  get(params: any = {}): Observable<Order[]> {
    return this.http.get<Order[]>('/api/order', {
      params: new HttpParams({
        fromObject: params
      })
    }).pipe(catchError(hadleHttpError));
  }

  add(position: Position) {
    const orderPosition = Object.assign({
      name: position.name,
      cost: position.cost,
      quantity: position.quantity,
      _id: position._id,
    });

    this.updateList(orderPosition);
  }

  remove(position: Position) {
    const idx = this.list.findIndex((p: Position) => p._id === position._id);

    if (idx > -1) { this.list.splice(idx, 1); }

    this._dispatch();
  }

  clear() {
    this.list.length = 0;
  }

  private updateList(position: OrderItem) {
    const canditate = this.list.find((p: Position) => p._id === position._id);

    canditate ? canditate.quantity = position.quantity : this.list.push(position);
    this._dispatch();
  }

  private _dispatch() {
    this.channel.next({ list: this.list, price: calculateTotals(this.list) });
  }

}
