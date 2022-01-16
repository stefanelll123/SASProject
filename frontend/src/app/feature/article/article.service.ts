import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ToastService } from 'src/app/components/toast/toast.service';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  
  baseURL = 'http://localhost:8802/api/';

  articles = [];
  options;

  constructor(private http: HttpClient, private toastService:ToastService, private router: Router) {
    this.options = {
      headers: new HttpHeaders({
          'Content-Type': 'application/json',
          // 'Access-Control-Allow-Headers': 'Access-Control-Allow-Origin',
      }),
  };
  }

  getArticles(): void {
    const url = this.baseURL+'articles/0/10?';

    this.http.get(url, this.options);
  }

  getNewsFeed(): Observable<any> {
    const url = this.baseURL+'newsfeed/0/10?';

    return this.http.get(url, this.options);
  }

  setArticles(articles): void {

    this.articles = articles;
  }
}
