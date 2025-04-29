import { Injectable } from '@angular/core';
import {BaseCrudService} from "../../../shared/services/BaseCrudService/base-crud-service.service";
import {HttpClient, HttpParams} from "@angular/common/http";
import {firstValueFrom} from "rxjs";
import {catchError} from "rxjs/operators";
import {environment} from "../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ExpensesService extends BaseCrudService {

  constructor( httpClient : HttpClient )  {
    super(httpClient , 'expenses');
  }


  // Read all resources
  getAllCategories({ page = 1, search = "", from, to  , all , per_page = 5}: { page?: number; search?: string; from?: string; to?: string , per_page? :number , all? : boolean }): Promise<any[]> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('search', search);

    if (from) {
      params = params.set('from', from);
    }
    if (to) {
      params = params.set('to', to);
    }
    if (per_page) {
      params = params.set('per_page', per_page);
    }
    if (all) {
      params = params.set('per_page', Number.MAX_SAFE_INTEGER );
    }
    return firstValueFrom(
      this.http.get<any[]>(`${environment.serverUrl}/expense_categories`, { params })
    );
  }
  // Create a new resource
  createCategory(resource: any): Promise<any> {
    return firstValueFrom(
      this.http.post<any>(`${environment.serverUrl}/expense_categories`, resource)
    );
  }

  override   update(id: number, resource: any): Promise<any> {
    return firstValueFrom(
      this.http.put<any>(`${environment.serverUrl}/expenses/${id}`, resource)
    );
  }



  deleteCategory(id: any): Promise<void> {
    return firstValueFrom(
      this.http.delete<void>(`${environment.serverUrl}/expense_categories/${id}`)
    );
  }

  deleteLabel(id: any): Promise<void> {
    return firstValueFrom(
      this.http.delete<void>(`${environment.serverUrl}/expense_labels/${id}`)
    );
  }
}
