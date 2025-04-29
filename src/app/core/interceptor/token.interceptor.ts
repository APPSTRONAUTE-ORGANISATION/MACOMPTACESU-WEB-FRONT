import { HttpInterceptorFn, HttpRequest, HttpHandlerFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  let token = null ;
  const currentUser = localStorage.getItem("currentUser");
  const currentUserTemp = localStorage.getItem("tempData");
  if (currentUser) {
      token = JSON.parse(currentUser)?.token;
  }else if (currentUserTemp) {
    token = JSON.parse(currentUserTemp)?.token;
  }


  let authReq = req;

  if (token) {
    authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  } else {
    console.log("Token not found (Redirect to Login)");
  }

  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        localStorage.removeItem("Token")
        let msg = "Token a expiré. Veuillez vous reconnecter.";
        router.navigate(['/auth/login'] ,{ queryParams: { msg } });
      }
      return throwError(error);
    })
  );
};
