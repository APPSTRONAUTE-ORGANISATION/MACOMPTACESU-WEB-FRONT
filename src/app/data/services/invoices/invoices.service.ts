import { Injectable } from '@angular/core';
import {BaseCrudService} from "../../../shared/services/BaseCrudService/base-crud-service.service";
import {HttpClient, HttpParams} from '@angular/common/http';
import {firstValueFrom} from "rxjs";
import {catchError} from "rxjs/operators";
import {environment} from "../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class InvoicesService extends BaseCrudService{

  constructor(HttpClient : HttpClient) {
    super(HttpClient , 'invoices');
  }

  override getAll({
    page = 1,
    search = "",
    client_id,
    from,
    to,
    year,
    status,
    all = false // Assuming you want to add an 'all' parameter
  }: {
    page?: number; 
    search?: string; 
    client_id?: number;
    status?:string | null; 
    from?: string; // Define type for 'from'
    to?: string; // Define type for 'to'
    year?: string | number ; 
    all?: boolean; // Add 'all' parameter
  }): Promise<any[]> {
    let params = new HttpParams().set('search', search);
  
    if (page) {
      params = params.set('page', page.toString());
    }
    if (year) {
      params = params.set('year', year);
    }
    if (status) {
      params = params.set('status', status);
    }
    if (from) {
      params = params.set('from', from);
    }
    if (to) {
      params = params.set('to', to);
    }
    if (client_id) {
      params = params.set('client_id', client_id.toString()); // Ensure client_id is a string
    }
    if (all) {
      params = params.set('per_page', Number.MAX_SAFE_INTEGER.toString()); // Convert to string
    }
  
    return firstValueFrom(
      this.http.get<any[]>(`${environment.serverUrl}/invoices`, { params })
    );
  }
  
  override   update(id: number, resource: any): Promise<any> {
    return firstValueFrom(
      this.http.put<any>(`${environment.serverUrl}/invoices/${id}`, resource)
    );
  }

  getAllNotifications({
    page = 1,
    search = "",
    client_id,
    from,
    to,
    perpage,
    all = false // Assuming you want to add an 'all' parameter
  }: {
    page?: number; 
    search?: string; 
    perpage? : number;
    client_id?: number; 
    from?: string; // Define type for 'from'
    to?: string; // Define type for 'to'
    all?: boolean; // Add 'all' parameter
  }): Promise<any[]> {
    let params = new HttpParams().set('search', search);
  
    if (page) {
      params = params.set('page', page.toString());
    }
    if (from) {
      params = params.set('from', from);
    }
    if (perpage) {
      params = params.set('per_page', perpage);
    }
    if (to) {
      params = params.set('to', to);
    }
    if (client_id) {
      params = params.set('client_id', client_id.toString()); // Ensure client_id is a string
    }
    if (all) {
      params = params.set('per_page', Number.MAX_SAFE_INTEGER.toString()); // Convert to string
    }
  
    return firstValueFrom(
      this.http.get<any[]>(`${environment.serverUrl}/invoices/due_invoices`, { params })
    );
  }


  getInvoicesbyYear({
    page = 1,
    year,
    search = "",
    client_id,
    from,
    to,
    perpage,
    all = false // Assuming you want to add an 'all' parameter
  }: {
    year?: number; 
    page?: number; 
    search?: string; 
    perpage? : number;
    client_id?: number; 
    from?: string; // Define type for 'from'
    to?: string; // Define type for 'to'
    all?: boolean; // Add 'all' parameter
  }): Promise<any[]> {
    let params = new HttpParams().set('search', search);
  
    if (page) {
      params = params.set('page', page.toString());
    }
    if (year) {
      params = params.set('year', year);
    }
    if (from) {
      params = params.set('from', from);
    }
    if (perpage) {
      params = params.set('per_page', perpage);
    }
    if (to) {
      params = params.set('to', to);
    }
    if (client_id) {
      params = params.set('client_id', client_id.toString()); // Ensure client_id is a string
    }
    if (all) {
      params = params.set('per_page', Number.MAX_SAFE_INTEGER.toString()); // Convert to string
    }
  
    return firstValueFrom(
      this.http.get<any[]>(`${environment.serverUrl}/invoices/invoices_by_year`, { params })
    );
  }

  updateHoursDay(id: number, resource: any): Promise<any> {
    return firstValueFrom(
      this.http.put<any>(`${environment.serverUrl}/invoice_days/${id}`, resource)
    );
  }




getTotalsWithBudgetsForMonths({
    page = 1,
    search = "",
    client_id,
    from,
    to,
    year,
    status,
    all = false
  }: {
    page?: number; 
    search?: string; 
    year?: any; 
    client_id?: number;
    status?:string | null; 
    from?: string;
    to?: string;
    all?: boolean;
  }): Promise<any[]> {
    let params = new HttpParams().set('search', search);
  
    if (page) {
      params = params.set('page', page.toString());
    }
    if (status) {
      params = params.set('status', status);
    }
    if (year) {
      params = params.set('year', year);
    }
    if (from) {
      params = params.set('from', from);
    }
    if (to) {
      params = params.set('to', to);
    }
    if (all) {
      params = params.set('per_page', Number.MAX_SAFE_INTEGER.toString()); // Convert to string
    }
  
    return firstValueFrom(
      this.http.get<any[]>(`${environment.serverUrl}/invoices/invoices_by_month`, { params })
    );
  }
  


}
