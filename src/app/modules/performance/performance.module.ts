import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PerformanceRoutingModule } from './performance-routing.module';
import { NgApexchartsModule } from 'ng-apexcharts';

import {  HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader, TranslateService, TranslateStore } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { provideAngularQuery, QueryClient } from '@tanstack/angular-query-experimental';

// Function to create the TranslateHttpLoader
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    PerformanceRoutingModule,
    NgApexchartsModule,
     TranslateModule.forChild({
          loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient],
          },
        }),
  ],
  providers : [provideAngularQuery( new QueryClient()) , TranslateStore , TranslateService]
})
export class PerformanceModule { }
