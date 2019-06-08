import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

import { Order } from 'src/app/shared/models';
import { calculateTotals } from 'src/app/shared/services/helpers';

@Component({
  selector: 'app-history-list',
  templateUrl: './history-list.component.html',
  styleUrls: ['./history-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HistoryListComponent {
  @Input() orders: Order[];

  selectedOrder: Order;

  onSelectOrder(order: Order) {
    this.selectedOrder = order;
  }

  calculatePrice(order: Order): number {
    return calculateTotals(order.list);
  }

}
