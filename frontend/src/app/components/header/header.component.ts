import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ArticleService } from 'src/app/feature/article/article.service';
import { ProfileService } from 'src/app/feature/profile/profile.service';
import { ToastService } from '../toast/toast.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isSearchVisible: boolean;
  isProfileIconVisible: boolean;
  currentUrl: string;
  searchTerm: string;

  constructor(private router: Router, public profileService:ProfileService, private articleService:ArticleService, private toastService:ToastService) { }

  ngOnInit(): void {

    this.currentUrl = this.router.url;

    this.isSearchVisible = !(this.currentUrl === '/login' || this.currentUrl === '/register' || this.currentUrl === '/profile');
    this.isProfileIconVisible = !(this.currentUrl === '/login' || this.currentUrl === '/register');
  }

  logout(): void {

    localStorage.removeItem('user')
    localStorage.removeItem('access_token')
    location.reload();
  }

  searchArticle():void {

    let sub = null;
    if(this.searchTerm) {
      sub = this.articleService.getArticles(this.searchTerm)
    } else {
      sub = this.articleService.getNewsFeed()
    }

    sub.pipe(
      map((response: any) => {
        console.log(response)
        this.articleService.setArticles(response.articles);
      }),
      catchError(error => {
        console.log(error)
        this.toastService.show({error: true, message: error.error.error});
        return of(error);
     })).subscribe();
  }
}
