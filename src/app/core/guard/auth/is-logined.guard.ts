import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class isLoggedInGuard {

  constructor(private router: Router) { }

  canActivate(): Observable<boolean> {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');

    return of(currentUser).pipe(
      map(user => {
        const isLoggedIn = user?.token != null;

        if (isLoggedIn) {
          return true;
        } else if (localStorage.getItem('Token')) {
          return true;
        } else {
          this.router.navigate(['/auth/login']);
          return false;
        }
      })
    );
  }
}
