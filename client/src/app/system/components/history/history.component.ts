import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Order } from 'src/app/shared/models';
import { OrdersService } from 'src/app/core/services';

const STEP = 2;

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit, OnDestroy {
  private s$: Subscription;

  viewMoreLoading = false;
  reloading = false;
  isFilterVisible = false;
  offset = 0;
  limit = STEP;
  isMoreOrders = true;
  orders: Order[] = [];

  constructor(private ordersService: OrdersService) { }

  ngOnInit() {
    this.reloading = true;
    this.getOrders();
  }

  ngOnDestroy() {
    this.s$.unsubscribe();
  }

  onViewMore() {
    this.offset += STEP;
    this.viewMoreLoading = true;
    this.getOrders();
  }

  private getOrders() {
    const params = { offset: this.offset, limit: this.limit };

    this.s$ = this.ordersService.get(params).subscribe((orders: Order[]) => {
      this.orders = [...this.orders, ...orders];
      this.viewMoreLoading = false;
      this.reloading = false;
      this.isMoreOrders = orders.length >= STEP;
    });
  }

}
