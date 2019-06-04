import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SystemRoutingModule } from './system-routing.module';
import { SharedModule } from '../shared/shared.module';

import { SystemComponent } from './system.component';
import {
  ActionButtonComponent,
  AnalyticsComponent,
  CategoriesComponent,
  CategoriesFormComponent,
  CategoriesActionsComponent,
  HistoryComponent,
  NavigationComponent,
  OrderComponent,
  OverviewComponent,
  PositionsFormComponent
} from './components';

@NgModule({
  declarations: [
    SystemComponent,
    ActionButtonComponent,
    AnalyticsComponent,
    CategoriesComponent,
    CategoriesFormComponent,
    CategoriesActionsComponent,
    HistoryComponent,
    NavigationComponent,
    OrderComponent,
    OverviewComponent,
    PositionsFormComponent
  ],
  imports: [
    CommonModule,
    SystemRoutingModule,
    SharedModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SystemModule { }
