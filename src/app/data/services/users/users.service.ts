import { Injectable } from '@angular/core';
import { BaseCrudService } from '../../../shared/services/BaseCrudService/base-crud-service.service';
import { HttpClient } from '@angular/common/http';
import {firstValueFrom, tap} from "rxjs";
import {environment} from "../../../../environments/environment.development";
@Injectable({
  providedIn: 'root'
})
export class UsersService extends BaseCrudService {
  constructor(private httpClient : HttpClient ) {
    super(httpClient, 'users')
  }
  override create(resource: any): Promise<any> {
    return firstValueFrom(
      this.http.post<any>(`${environment.serverUrl}/register`, resource).pipe(
        tap((response) => {
        })
      )
    );
  }

}
