import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from 'src/app/account/auth/services/auth.service';
import { Router } from '@angular/router';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(
        private authenticationService: AuthService,
        private router: Router,
    ) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            if (err.status === 400) {
                //this.toastService.showError(error,'');
                //DESPLEGAR ERROR
            }
            if (err.status === 401) {
                this.authenticationService.logout();
                this.router.navigateByUrl('/login');
                return
            }
            if (err.status === 500) {
                //this.toastService.showError(error,'');

                //DESPLEGAR MENSAJE PERSONALIZADO
            }
            return throwError(err);
        }));
    }
}
