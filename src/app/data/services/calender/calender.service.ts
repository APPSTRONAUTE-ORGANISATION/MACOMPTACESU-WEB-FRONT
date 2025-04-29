import { Injectable } from '@angular/core';
import {BaseCrudService} from "../../../shared/services/BaseCrudService/base-crud-service.service";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CalenderService extends BaseCrudService {

  constructor(httpClient : HttpClient) {
    super(httpClient , 'invoices/calendar')
  }
}
