import { Injectable } from '@angular/core';
import { BaseCrudService } from '../../../shared/services/BaseCrudService/base-crud-service.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WeeksComparisonService extends BaseCrudService{
  constructor(private httpClient: HttpClient) {
    super(httpClient, 'weeks_comparison');
  }
}
