import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SystemRoutingModule } from './system-routing.module';
import { SharedModule } from '../shared/shared.module';

import { SystemComponent } from './system.component';
import {
  AnalyticsComponent,
  CategoriesListComponent,
  CategoriesFormComponent,
  CategoriesActionsComponent,
  HistoryComponent,
  HistoryFilterComponent,
  HistoryListComponent,
  NavigationComponent,
  OrderComponent,
  OrderCategoriesComponent,
  OrderPositionsComponent,
  OverviewComponent,
  PositionsFormComponent
} from './components';

@NgModule({
  declarations: [
    SystemComponent,
    AnalyticsComponent,
    CategoriesListComponent,
    CategoriesFormComponent,
    CategoriesActionsComponent,
    HistoryComponent,
    NavigationComponent,
    OrderComponent,
    OrderCategoriesComponent,
    OrderPositionsComponent,
    OverviewComponent,
    PositionsFormComponent,
    HistoryListComponent,
    HistoryFilterComponent
  ],
  imports: [
    CommonModule,
    SystemRoutingModule,
    SharedModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SystemModule { }
