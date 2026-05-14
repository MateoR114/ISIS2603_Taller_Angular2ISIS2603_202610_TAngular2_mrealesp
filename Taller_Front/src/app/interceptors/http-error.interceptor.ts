import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(private toastr: ToastrService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        if (req.url.includes('weatherapi.com')) {
          this.toastr.error('Error al conectar con WeatherAPI. Intente más tarde.');
        } else {
          this.toastr.error(`Error ${error.status}: ${error.message}`);
        }
        return throwError(() => error);
      })
    );
  }
}