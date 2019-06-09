import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Order, Filter } from 'src/app/shared/models';
import { OrdersService } from 'src/app/core/services';
import { STEP } from 'src/app/configs';

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
  filter: Filter = {};
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

  onFilterApply(filter: Filter) {
    this.orders.length = 0;
    this.offset = 0;
    this.reloading = true;
    this.filter = filter;
    this.getOrders();
  }

  isFiltered(): boolean {
    return Object.keys(this.filter).length > 0;
  }

  private getOrders() {
    const params = Object.assign({}, this.filter, {
      offset: this.offset, limit: this.limit
    });

    this.s$ = this.ordersService.get(params).subscribe((orders: Order[]) => {
      this.orders = [...this.orders, ...orders];
      this.viewMoreLoading = false;
      this.reloading = false;
      this.isMoreOrders = orders.length >= STEP;
    });
  }

}
