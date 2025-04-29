import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InvoicesRoutingModule } from './invoices-routing.module';
import { provideAngularQuery, QueryClient } from '@tanstack/angular-query-experimental';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    InvoicesRoutingModule
  ],
  providers : [provideAngularQuery(new QueryClient())]
})
export class InvoicesModule { }
