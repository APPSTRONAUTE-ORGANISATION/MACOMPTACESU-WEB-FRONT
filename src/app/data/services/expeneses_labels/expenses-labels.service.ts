import { Injectable } from '@angular/core';
import { BaseCrudService } from '../../../shared/services/BaseCrudService/base-crud-service.service';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs/internal/firstValueFrom';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ExpensesLabelsService extends BaseCrudService{

  constructor( httpClient : HttpClient )  {
    super(httpClient , 'expense_labels');
  }


}
