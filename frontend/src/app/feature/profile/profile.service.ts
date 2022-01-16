import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ToastService } from 'src/app/components/toast/toast.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  baseURL = 'http://localhost:8802/api/';
  usersBaseURL= 'http://localhost:8801/api/';
  currentUser= null;
  articlesLiked = [];
  preferences = [];

  constructor(private http: HttpClient, private toastService:ToastService, private router: Router) { }

  setCurrentUser() {
    const user = JSON.parse(localStorage.getItem('user'));
    this.currentUser = user;
  }


  getArticlesLiked(): Observable<any> {
    const url = this.baseURL+'users/'+ this.currentUser.userId+ '/articles';

    return this.http.get(url);
  }

  getPreferences(): Observable<any> {

    const url = this.usersBaseURL+'users/'+ this.currentUser.userId+ '/preferences';

    return this.http.get(url);
  }

  setArticles(articles): void {

    this.articlesLiked = articles;
  }

  setPreferences(preferences): void {

    this.preferences = preferences;
  }
}
