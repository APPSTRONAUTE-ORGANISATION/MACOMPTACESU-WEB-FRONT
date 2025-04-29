import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BudgetsRoutingModule } from './budgets-routing.module';
import { provideAngularQuery, QueryClient } from '@tanstack/angular-query-experimental';
import { NzSegmentedModule } from 'ng-zorro-antd/segmented';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NzSegmentedModule,
    BudgetsRoutingModule,
  ],
  providers : [provideAngularQuery(new QueryClient)]
})
export class BudgetsModule { }
