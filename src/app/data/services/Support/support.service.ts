import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BaseCrudService} from "../../../shared/services/BaseCrudService/base-crud-service.service";

@Injectable({
  providedIn: 'root'
})
export class SupportService extends BaseCrudService{
  constructor(private httpClient: HttpClient) {
    super(httpClient, 'tickets');
  }
}
