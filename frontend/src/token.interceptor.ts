import {Injectable} from '@angular/core';
import {HttpHandler, HttpInterceptor, HttpRequest, HttpResponse, HttpXhrBackend} from '@angular/common/http';
import {Router} from '@angular/router';
import {catchError, finalize} from 'rxjs/operators';
import {throwError} from 'rxjs';
import { LoadingService } from './app/components/loading/loading.service';

@Injectable()

export class TokenInterceptor implements HttpInterceptor {

    constructor(private router: Router, private loadingService: LoadingService) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): any {

        const token = localStorage.getItem('access_token');
        this.loadingService.start();

        if (token) {
            const reqClone: HttpRequest<any> = req.clone({
                setHeaders: {
                    Authentication: `Bearer ${token}`
                }
            });
            return next.handle(reqClone)
                .pipe(
                    catchError(error => {
                        if (error.status === 401) {
                            this.router.navigateByUrl('login');
                        }
                        return throwError(error);
                    }),
                    finalize(() => this.loadingService.stop())
                );
        } else {
            return next.handle(req)
                .pipe(
                    catchError(error => {
                        return throwError(error);
                    }),
                    finalize(() => this.loadingService.stop())
                );
        }
    }
}
