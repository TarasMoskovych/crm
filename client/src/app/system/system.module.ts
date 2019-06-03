import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SystemRoutingModule } from './system-routing.module';
import { SharedModule } from '../shared/shared.module';

import { SystemComponent } from './system.component';
import {
  ActionButtonComponent,
  AnalyticsComponent,
  CategoriesComponent,
  HistoryComponent,
  NavigationComponent,
  OrderComponent,
  OverviewComponent
} from './components';

@NgModule({
  declarations: [
    SystemComponent,
    ActionButtonComponent,
    AnalyticsComponent,
    CategoriesComponent,
    HistoryComponent,
    NavigationComponent,
    OrderComponent,
    OverviewComponent
  ],
  imports: [
    CommonModule,
    SystemRoutingModule,
    SharedModule
  ]
})
export class SystemModule { }