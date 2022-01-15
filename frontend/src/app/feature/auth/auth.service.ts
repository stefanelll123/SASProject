import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseURL = environment.apiUrl;
  options;

  constructor(private http: HttpClient) {
      this.options = {
          headers: new HttpHeaders({
              'Content-Type': 'application/json',
              // 'Access-Control-Allow-Headers': 'Access-Control-Allow-Origin',
          }),
      };
  }

  register(newUserPayload): Observable<any> {
    
    const url = this.baseURL + 'register';

    console.log(url)

    return this.http.post(url, newUserPayload, this.options);
  }

  login(form): Observable<any> {

    const apiURL = this.baseURL + 'login';

    return this.http.post(apiURL, form, this.options);
}
}
