import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, tap, throwError} from 'rxjs';
import {catchError} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://back.macomptacesu.com/api'; //prod
  // private apiUrl = 'http://localhost:8000/api'; //local
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser')!));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  // Get the current user value
  public get currentUserValue() {
    return this.currentUserSubject.value;
  }

  // Login method
  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, { email, password }).pipe(
      tap(user => {
        // Store user details and JWT token in local storage
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);
      })
    );
  }

  signup(data: { name: string; surname: string; country: string; phone: string; profession: string; email: string; password: string; }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register`, data).pipe(
      tap(user => {
        //localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);
      })
    );
  }

  // Logout method
  logout() {
    // Remove user from local storage and set current user to null
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  // Check if user is logged in
  isLoggedIn(): boolean {
    return this.currentUserValue !== null;
  }

  update_password(data: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/update_password`, data).pipe(
      tap((response) => {
      }),
      catchError((error) => {
        return throwError(() => error);
      })
    );
  }

  // Request OTP
  demandeOtpNumber(email: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/forgot_password`, { email }).pipe(
      tap((response) => {
      }),
      catchError((error) => {
        return throwError(() => error);
      })
    );
  }

  // Verify OTP
  VerifyOtp(otp: number): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/check_reset_password_token`, { otp }).pipe(
      tap((response) => {
      }),
      catchError((error) => {
        return throwError(() => error);
      })
    );
  }

  // Change the password
  ChangePassword(data : any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/reset_password`, data).pipe(
      tap((response) => {
      }),
      catchError((error) => {
        return throwError(() => error);
      })
    );
  }


}
