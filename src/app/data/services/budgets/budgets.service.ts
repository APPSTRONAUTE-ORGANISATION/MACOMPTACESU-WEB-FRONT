import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseCrudService } from '../../../shared/services/BaseCrudService/base-crud-service.service';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class BudgetsService extends BaseCrudService {

  constructor(private HttpClient : HttpClient) {
      super(HttpClient , 'budgets')
   }


   
   override update(id: number, resource: any): Promise<any> {
     return firstValueFrom(
       this.http.put<any>(`${environment.serverUrl}/budgets/${id}`, resource)
     );
   }
}
