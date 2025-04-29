import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BaseCrudService} from "../../../shared/services/BaseCrudService/base-crud-service.service";
import {firstValueFrom} from "rxjs";
import {catchError} from "rxjs/operators";
import {environment} from "../../../../environments/environment.development";

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http: HttpClient) { }
  // Update an existing resource
  update( resource: any): Promise<any> {


  


    return firstValueFrom(
      this.http.post<any>(`${environment.serverUrl}/update_profile`, resource)
    );
  }
  RemoveImage(): Promise<any> {
    const userId = JSON.parse(localStorage.getItem('currentUser') || '').user.id; 
    const formData = new FormData();
    formData.append('avatar', '');
  
    if (userId) {
      formData.append('id', userId); 
    }
  
    return firstValueFrom(
      this.http.post<any>(`${environment.serverUrl}/update_profile_image`, formData)
    );
  }
  
  // Update an existing resource
  getMyPlan(resource: any): Promise<any> {
    return firstValueFrom(
      this.http.get<any>(`${environment.serverUrl}/plan`, resource)
    );
  }
}
