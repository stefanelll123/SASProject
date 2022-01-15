import {Injectable} from '@angular/core';
import {HttpHandler, HttpInterceptor, HttpRequest, HttpResponse, HttpXhrBackend} from '@angular/common/http';
import {Router} from '@angular/router';
import {catchError} from 'rxjs/operators';
import {throwError} from 'rxjs';

@Injectable()

export class TokenInterceptor implements HttpInterceptor {

    constructor(private router: Router) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): any {

        const token = localStorage.getItem('access_token');

        if (token) {
            const reqClone: HttpRequest<any> = req.clone({
                setHeaders: {
                    Authorization: `Bearer ${token}`
                }
            });
            return next.handle(reqClone)
                .pipe(
                    catchError(error => {
                        if (error.status === 401) {
                            this.router.navigateByUrl('login');
                        }
                        return throwError(error);
                    })
                );
        } else {
            return next.handle(req)
                .pipe(
                    catchError(error => {
                        return throwError(error);
                    })
                );
        }
    }
}
