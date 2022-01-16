import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ToastService } from 'src/app/components/toast/toast.service';
import { ProfileService } from '../profile/profile.service';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  
  baseURL = 'http://localhost:8802/api/';
  usersBaseURL= 'http://localhost:8801/api/';

  articles = [];

  constructor(private http: HttpClient, private toastService:ToastService, private router: Router, private profileService: ProfileService) {
  }

  getArticles(searchTerm): Observable<any> {
    const url = this.baseURL+'articles?offeset=0&limit=20&search='+searchTerm;

    return this.http.get(url);
  }

  getNewsFeed(): Observable<any> {
    const url = this.baseURL+'newsfeed?offeset=0&limit=20';

    return this.http.get(url);
  }

  likeArticle(item): Observable<any> {
    const indexOfArticle = this.articles.map(article=> article.id).indexOf(item.id)
    this.articles[indexOfArticle].liked = true;

    const url = this.usersBaseURL+'users/' + this.profileService.currentUser.userId + '/likes' ;

    return this.http.post(url, {articleId: item.id});
  }

  setArticles(articles): void {

    this.articles = articles;
  }
}
