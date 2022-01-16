import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { ToastService } from 'src/app/components/toast/toast.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseURL = environment.apiUrl;
  preferences= [
    {id:1, name: 'Mobile Application'},
    {id:2, name: 'Web Application'},
    {id:3, name: 'Quality Assurance'},
    {id:4, name: 'Database administrator'},
    {id:5, name: 'Network administrator'},
    {id:6, name: 'Angular'},
    {id:7, name: 'React'},
    {id:8, name: 'Javascript'},
    {id:9, name: 'Java'},
    {id:10, name: 'Python'},
    {id:11, name: 'PHP'},
    {id:12, name: 'SQL Database'},
    {id:13, name: 'NoSQL Database'},
    {id:14, name: 'MySQL'}
  ]
  options;

  constructor(private http: HttpClient, private toastService:ToastService, private router: Router) {
      this.options = {
          headers: new HttpHeaders({
              'Content-Type': 'application/json',
              // 'Access-Control-Allow-Headers': 'Access-Control-Allow-Origin',
          }),
      };
  }

  register(newUserPayload): Observable<any> {
    
    const url = this.baseURL + 'register';

    const newUserPayloadCopy = JSON.parse(JSON.stringify(newUserPayload));
    const preferencesAsString = newUserPayloadCopy.preferences.map(preference => {
      return this.preferences.find(item => item.id === preference).name.toLocaleLowerCase();
    })

    newUserPayloadCopy.preferences = preferencesAsString;

    return this.http.post(url, newUserPayloadCopy, this.options);
  }

  login(form): Observable<any> {

    const apiURL = this.baseURL + 'login';

    return this.http.post(apiURL, form, this.options);  
  }
}
