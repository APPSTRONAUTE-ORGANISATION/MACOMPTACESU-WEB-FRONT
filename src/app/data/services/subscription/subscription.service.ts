import { Injectable } from '@angular/core';
import {BaseCrudService} from "../../../shared/services/BaseCrudService/base-crud-service.service";
import {HttpClient} from "@angular/common/http";
import { catchError, firstValueFrom } from 'rxjs';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService extends BaseCrudService {

  constructor(private httpClient : HttpClient ) {
    super(httpClient , 'subscriptions');
  }

  cancel(subscriptionId: string, resource: any): Promise<any> {
    const url = `${environment.serverUrl}/subscriptions/${subscriptionId}/cancel`;
    return firstValueFrom(
      this.http.get<any>(url, resource).pipe()
    );
  }


  getInfoUser(): Promise<any> {
    const url = `${environment.serverUrl}/stripe/card-details`;
    return firstValueFrom(
      this.http.get<any>(url).pipe()
    );
  }

}
