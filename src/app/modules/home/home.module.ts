import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { provideAngularQuery, QueryClient } from "@tanstack/angular-query-experimental";
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';


import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader, TranslateStore, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';



registerLocaleData(localeFr);


import { LOCALE_ID } from '@angular/core';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HomeRoutingModule,

    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })

  ],
  providers: [provideAngularQuery(new QueryClient()), { provide: LOCALE_ID, useValue: 'fr-FR' } // Set to French locale
    , TranslateStore, TranslateService],

})
export class HomeModule { }
