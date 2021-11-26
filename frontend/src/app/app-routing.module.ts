import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ArticleListComponent } from './feature/article/article-list/article-list.component';
import { ColdStartComponent } from './feature/cold-start/cold-start.component';

const routes: Routes = [
  {
    path: '',
    component: ColdStartComponent
  },
  {
    path: 'articles',
    component: ArticleListComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
