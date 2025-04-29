import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExpensesRoutingModule } from './expenses-routing.module';
import { provideAngularQuery, QueryClient } from "@tanstack/angular-query-experimental";


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ExpensesRoutingModule
  ],
  providers: [provideAngularQuery(new QueryClient())],

})
export class ExpensesModule { }
