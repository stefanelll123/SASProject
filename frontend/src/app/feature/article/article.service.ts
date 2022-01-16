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

  constructor(private http: HttpClient, private toastService:ToastService, private router: Router) {
  }

  getArticles(): void {
    const url = this.baseURL+'articles?offeset=0&limit=20';

    this.http.get(url);
  }

  getNewsFeed(): Observable<any> {
    const url = this.baseURL+'newsfeed?offeset=0&limit=20';

    return this.http.get(url);
  }

  setArticles(articles): void {

    this.articles = articles;
  }
}
