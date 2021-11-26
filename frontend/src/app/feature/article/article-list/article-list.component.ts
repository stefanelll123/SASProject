import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../article.service';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.scss']
})
export class ArticleListComponent implements OnInit {

  articles;

  constructor(private articleService:ArticleService) { }

  ngOnInit(): void {

    this.articles = this.articleService.getArticles()
    console.log(this.articles)
  }

}
