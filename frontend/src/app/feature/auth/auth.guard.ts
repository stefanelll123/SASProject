import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {

      const token = localStorage.getItem('access_token');

      if (token) {
          if(state.url === '/login' || state.url === '/register') {
            this.router.navigate(['articles']);
          }

          return of(true);
      } else {
          this.router.navigate(['login']);
          return of(false);
      }
  }
}
