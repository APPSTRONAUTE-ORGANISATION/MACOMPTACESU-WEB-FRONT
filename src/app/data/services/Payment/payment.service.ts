import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {firstValueFrom, Observable} from 'rxjs';
import {environment} from "../../../../environments/environment";
import {catchError, map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private apiUrl = `${environment.serverUrl}`; // Your backend charge endpoint

  constructor(private http: HttpClient) { }

  createPaymentIntent(price_id: number , token : string) {
    if (price_id == null) {
      return Promise.reject(new Error('Invalid price_id: Cannot be null or undefined'));
    }
    return firstValueFrom(
      this.http.post<any>(`${this.apiUrl}/create_client_secret` ,
        {
          "plan_id" : price_id,
          "price_id" : price_id,
        } ,
        {
          headers : {
            'Authorization': `Bearer ${token}` // Use Bearer token here
          }
        }
        )
        .pipe(
          map(response => response),
          catchError(error => {
            throw error;
          })
        )
    );
  }

  createPaymentInvoices(data: any) {

    return firstValueFrom(
      this.http.post<any>(`${this.apiUrl}/payments` , data)
        .pipe(
          map(response => response),
          catchError(error => {
            throw error;
          })
        )
    );
  }

  updatePaymentInvoices(id: any, data: any) {

    return firstValueFrom(
      this.http.put<any>(`${this.apiUrl}/payments/${id}` , data)
        .pipe(
          map(response => response),
          catchError(error => {
            throw error;
          })
        )
    );
  }

}
