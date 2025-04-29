import { Injectable } from '@angular/core';
import { BaseCrudService } from '../../../shared/services/BaseCrudService/base-crud-service.service';
import {HttpClient, HttpParams} from '@angular/common/http';
import { Observable, catchError, firstValueFrom, tap } from 'rxjs';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ClientsService extends BaseCrudService {

  constructor(private httpClient: HttpClient) {
    super(httpClient, 'clients');
  }

  override update(id: number, resource: any): Promise<any> {
    return firstValueFrom(
      this.httpClient.patch<any>(`${environment.serverUrl}/clients/${id}`, resource)
    );
  }

    override create(resource: any): Promise<any> {
      return firstValueFrom(
        this.http.post<any>(`${environment.serverUrl}/clients`, resource).pipe(
          tap((response) => {
          })
        )
      );
    }
    
  // Read all resources
  getTotalClientsData({ page = 1, search = "" , from ="" , to ="" }: { page?: any; search?: any ; from?:string ; to?:string }): Promise<any[]> {
    return firstValueFrom(
      this.http.get<any[]>(`${environment.serverUrl}/clients/total_clients`, {
        params: new HttpParams()
          .set('page', page.toString())
          .set('search', search)
          .set('from', from)
          .set('to', to),
      })
    );
  }

}
