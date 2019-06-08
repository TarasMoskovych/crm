import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { PositionsService, OrdersService } from 'src/app/core/services';
import { Position } from 'src/app/shared/models';
import { MaterialService } from 'src/app/shared/services';

@Component({
  selector: 'app-order-positions',
  templateUrl: './order-positions.component.html',
  styleUrls: ['./order-positions.component.scss']
})
export class OrderPositionsComponent implements OnInit {
  positions$: Observable<Position[]>;

  constructor(
    private route: ActivatedRoute,
    private ordersService: OrdersService,
    private positionsService: PositionsService
  ) { }

  ngOnInit() {
    this.getPositions();
  }

  onPositionAdd(position: Position) {
    this.ordersService.add(position);
    MaterialService.toast(`Added ${position.name}: ${position.quantity} ${position.quantity > 1 ? 'items' : 'item'}.`);
  }

  private getPositions() {
    this.positions$ = this.positionsService
      .getAllByCategoryId(this.route.snapshot.params.id)
      .pipe(map((positions: Position[]) => positions.map((position: Position) => {
        position.quantity = 1;
        return position;
      })));
  }

}
