import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SystemComponent } from './system.component';
import {
  AnalyticsComponent,
  CategoriesActionsComponent,
  CategoriesComponent,
  HistoryComponent,
  OrderComponent,
  OverviewComponent
} from './components';

import { AuthGuard } from './../core/guards';

const routes: Routes = [
  {
    path: '',
    component: SystemComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'analytics',
        component: AnalyticsComponent
      },
      {
        path: 'categories',
        component: CategoriesComponent
      },
      {
        path: 'categories/new',
        component: CategoriesActionsComponent
      },
      {
        path: 'categories/:id',
        component: CategoriesActionsComponent
      },
      {
        path: 'history',
        component: HistoryComponent
      },
      {
        path: 'order',
        component: OrderComponent
      },
      {
        path: 'overview',
        component: OverviewComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SystemRoutingModule {}
