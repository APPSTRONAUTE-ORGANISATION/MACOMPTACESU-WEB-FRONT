import { NgModule, LOCALE_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader, TranslateStore, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { CalenderRoutingModule } from './calender-routing.module';
import { provideAngularQuery, QueryClient } from '@tanstack/angular-query-experimental';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';

// Register the French locale
registerLocaleData(localeFr, 'fr');

// Function to create the TranslateHttpLoader
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    CalenderRoutingModule,
    HttpClientModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ],
  providers: [
    provideAngularQuery(new QueryClient()),
    { provide: LOCALE_ID, useValue: 'fr' }, // Use French locale
    TranslateStore , TranslateService
  ],
})
export class CalenderModule {}
