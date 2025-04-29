import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader, TranslateService, TranslateStore } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { ClientsRoutingModule } from './clients-routing.module';
import { QueryClient, provideAngularQuery } from '@tanstack/angular-query-experimental';
import { NgApexchartsModule } from 'ng-apexcharts';

// Function to create the TranslateHttpLoader
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ClientsRoutingModule,
    NgApexchartsModule,
    TranslateModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ],
  providers: [provideAngularQuery(new QueryClient()) , TranslateStore, TranslateService],
})
export class ClientsModule {}


