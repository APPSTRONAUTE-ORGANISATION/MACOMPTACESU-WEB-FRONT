import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {BaseCrudService} from "../../../shared/services/BaseCrudService/base-crud-service.service";
import { firstValueFrom, Observable } from 'rxjs';
import {environment} from "../../../../environments/environment.development";

@Injectable({
  providedIn: 'root'
})
export class PlanService extends BaseCrudService {

  constructor(private httpClient: HttpClient) {
    super(httpClient, 'plans');
  }

  private readonly freeTrialEndpoint = 'subscription/free-trial';


  async getFreeTrial(): Promise<any> {
    return firstValueFrom(
      this.httpClient.get<any>(`${environment.serverUrl}/${this.freeTrialEndpoint}`)
    );
  }

  async startFreeTrial(data: any, token: string): Promise<any> {

    return firstValueFrom(
      this.httpClient.post<any>(`${environment.serverUrl}/${this.freeTrialEndpoint}`, data , {
        headers: {
          'Authorization': `Bearer ${token}` // Use Bearer token here
        }
      })
    );
  }

}


