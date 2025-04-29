import {Inject, Injectable} from '@angular/core';
import {environment} from "../../../../environments/environment.development";
import {HttpClient, HttpParams} from "@angular/common/http";
import {firstValueFrom} from "rxjs";
import {catchError} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class StatsService {

  private baseUrl = environment.serverUrl;

  constructor(protected http: HttpClient, ) { }

  //api/stats/invoices?from=&to=
  GetClientsStats({ page , search = "", from, to }: { page?: number; search?: string; from?: string; to?: string }): Promise<any[]> {
    let params = new HttpParams()
      .set('search', search);

    if (from) {
      params = params.set('from', from);
    }
    if (to) {
      params = params.set('to', to);
    }

    return firstValueFrom(
      this.http.get<any[]>(`${this.baseUrl}/stats/clients`, { params })
    );
  }


  //api/stats/invoices?from=&to=
  GetInvoicesStats({ page = 1, all , search = "", from, to , client_id }: { all?:boolean , page?: number; search?: string; from?: string; to?: string , client_id?: string }): Promise<any[]> {
    let params = new HttpParams()
      .set('search', search);

    if (page) {
      params = params.set('page', page.toString());
    }
    if (from) {
      params = params.set('from', from);
    }
    if (to) {
      params = params.set('to', to);
    }
    if (client_id) {
      params = params.set('client_id', client_id);
    }
    if (all) {
      params = params.set('per_page', Number.MAX_SAFE_INTEGER );
    }
    return firstValueFrom(
      this.http.get<any[]>(`${this.baseUrl}/stats/invoices`, { params })
    );
  }

  //api/stats/unpaid_invoices?from=&to=
  GetUnpaidInvoicesStats({ page = 1, search = "", from, to }: { page?: number; search?: string; from?: string; to?: string }): Promise<any[]> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('search', search);

    if (from) {
      params = params.set('from', from);
    }
    if (to) {
      params = params.set('to', to);
    }

    return firstValueFrom(
      this.http.get<any[]>(`${this.baseUrl}/stats/unpaid_invoices`, { params })
    );
  }

  //api/stats/work_hours?from=&to=
  GetWorkHoursStats({ page = 1, search = "", from, to , year }: { page?: number; search?: string; from?: string; to?: string , year?:string | number }): Promise<any[]> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('search', search);

    if (from) {
      params = params.set('from', from);
    }
    if (year) {
      params = params.set('year', year);
    }
    if (to) {
      params = params.set('to', to);
    }

    return firstValueFrom(
      this.http.get<any[]>(`${this.baseUrl}/stats/work_hours`, { params })
    );
  }

  //api/stats/latest_payments
  GetLastPaymentsStats({ page = 1, search = "", from, to }: { page?: number; search?: string; from?: string; to?: string }): Promise<any[]> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('search', search);

    if (from) {
      params = params.set('from', from);
    }
    if (to) {
      params = params.set('to', to);
    }

    return firstValueFrom(
      this.http.get<any[]>(`${this.baseUrl}/stats/latest_payments`, { params })
    );
  }

  //api/stats/latest_unpaid_clients
  GetLastUnpaidClientsStats({ All=true, page = 1, search = "", from, to }: { All?: boolean, page?: number; search?: string; from?: string; to?: string }): Promise<any[]> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('search', search);
    if (All) {
      params = params.set('per_page', Number.MAX_SAFE_INTEGER );
    }
    if (from) {
      params = params.set('from', from);
    }
    if (to) {
      params = params.set('to', to);
    }

    return firstValueFrom(
      this.http.get<any[]>(`${this.baseUrl}/stats/latest_unpaid_clients`, { params })
    );
  }

}
