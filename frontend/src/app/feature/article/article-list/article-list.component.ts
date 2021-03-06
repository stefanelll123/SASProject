import { Component, OnInit } from '@angular/core';
import { of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ToastService } from 'src/app/components/toast/toast.service';
import { ArticleService } from '../article.service';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.scss']
})
export class ArticleListComponent implements OnInit {

  constructor(public articleService:ArticleService, private toastService:ToastService) { }

  ngOnInit(): void {

    this.getNewsFeed();
  }

  getNewsFeed(): void {

    const sub = this.articleService.getNewsFeed();

    sub.pipe(
      map((response: any) => {
        this.articleService.setArticles(response.articles);
      }),
      catchError(error => {
        this.toastService.show({error: true, message: error.error.message});
        return of(error);
     })).subscribe();
  }

  likeArticle(item) {

    const sub = this.articleService.likeArticle(item);

    sub.pipe(
      map((response: any) => {
        this.toastService.show({error: false, message: 'You have succesfully like the article!'})
      }),
      catchError(error => {
        this.toastService.show({error: true, message: error.error.error});
        return of(error);
     })).subscribe();
  }
}
