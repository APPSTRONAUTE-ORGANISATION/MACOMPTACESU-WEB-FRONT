import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError, firstValueFrom } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../../environments/environment.development';
import { NzSelectSearchComponent } from 'ng-zorro-antd/select';



@Injectable({
  providedIn: 'root'
})
export class BaseCrudService {
  private baseUrl = environment.serverUrl;

  constructor(protected http: HttpClient, @Inject('API_URL') private apiUrl: string) { }

  // Create a new resource
  create(resource: any): Promise<any> {
    return firstValueFrom(
      this.http.post<any>(`${this.baseUrl}/${this.apiUrl}`, resource).pipe(
        catchError(this.handleError)
      )
    );
  }

  // Read all resources
  getAll({ page = 1, search = "", from, to  , all , year  ,budget_id}: { budget_id?:number, page?: number; search?: string; from?: string; to?: string , all? : boolean  , year? : any}): Promise<any[]> {
    let params = new HttpParams()
      .set('search', search);

    if (from) {
      params = params.set('from', from);
    }
    if (page) {
      params = params.set('page', page);
    }
    if (budget_id) {
      params = params.set('budget', budget_id);
    }
    if (to) {
      params = params.set('to', to);
    }
    if (all) {
      params = params.set('per_page', Number.MAX_SAFE_INTEGER );
    }
    if (year){
      params = params.set('year' , year)
    }
    return firstValueFrom(
      this.http.get<any[]>(`${this.baseUrl}/${this.apiUrl}`, { params }).pipe(
        catchError(this.handleError)
      )
    );
  }


  // Get a single resource by ID
  getById(id: number): Promise<any> {
    return firstValueFrom(
      this.http.get<any>(`${this.baseUrl}/${this.apiUrl}/${id}`).pipe(
        catchError(this.handleError)
      )
    );
  }

  // Update an existing resource
  update(id: number, resource: any): Promise<any> {
    return firstValueFrom(
      this.http.post<any>(`${this.baseUrl}/${this.apiUrl}/${id}`, resource).pipe(
        catchError(this.handleError)
      )
    );
  }

  // Delete a resource by ID
  delete(id: number): Promise<void> {
    return firstValueFrom(
      this.http.delete<void>(`${this.baseUrl}/${this.apiUrl}/${id}`).pipe(
        catchError(this.handleError)
      )
    );
  }

  // Handle HTTP errors
  private handleError(error: HttpErrorResponse): Observable<never> {
    return throwError(() => new Error('Something went wrong; please try again later.'));
  }
}

