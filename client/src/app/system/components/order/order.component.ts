import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Router, RouterEvent, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';

import { OrdersService } from 'src/app/core/services';
import { Modal, OrderItem, Position, Order } from 'src/app/shared/models';
import { MaterialService } from 'src/app/shared/services';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit, OnDestroy {
  @ViewChild('createOrder') createOrderModal: Modal;

  private s$: Subscription;

  loading = false;
  isRoot: boolean;
  data: { list: OrderItem[], price: number };

  constructor(
    private ordersService: OrdersService,
    private router: Router
  ) { }

  ngOnInit() {
    this.isRoot = this.checkRootRoute();
    this.onRouterNavigate();
    this.onOrdersServiceItemsChange();
  }

  ngOnDestroy() {
    this.ordersService.clear();
    this.s$.unsubscribe();
  }

  onOrderApply() {
    this.loading = true;
    this.ordersService
      .create({ list: this.data.list.map((item: OrderItem) => {
          delete item._id;
          return item;
        })
      })
      .pipe((first()))
      .subscribe((order: Order) => {
        MaterialService.toast(`Order №${order.order} was created.`);
        this.ordersService.clear();
        this.createOrderModal.close();
        this.loading = false;
      });
  }

  onPositionRemove(position: Position) {
    this.ordersService.remove(position);
  }

  private onOrdersServiceItemsChange() {
    this.s$ = this.ordersService.channel$.subscribe((data: { list: OrderItem[], price: number }) => {
      this.data = data;
    });
  }

  private onRouterNavigate() {
    this.router.events.subscribe((event: RouterEvent) => {
      if (event instanceof NavigationEnd) { this.isRoot = this.checkRootRoute(); }
    });
  }

  private checkRootRoute() {
    return this.router.url === '/order';
  }

}
