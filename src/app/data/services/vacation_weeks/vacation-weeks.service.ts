import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseCrudService } from '../../../shared/services/BaseCrudService/base-crud-service.service';

@Injectable({
  providedIn: 'root'
})
export class VacationWeeksService extends BaseCrudService {

    constructor(private httpClient: HttpClient) {
      super(httpClient, 'vacation_weeks');
    }
}
