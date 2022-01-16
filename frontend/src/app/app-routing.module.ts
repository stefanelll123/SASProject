import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainLayoutComponent } from './components/main-layout/main-layout.component';
import { ArticleListComponent } from './feature/article/article-list/article-list.component';
import { AuthStackGuard } from './feature/auth/auth-stack.guard';
import { AuthGuard } from './feature/auth/auth.guard';
import { LoginComponent } from './feature/auth/login/login.component';
import { RegisterComponent } from './feature/auth/register/register.component';
import { ProfileComponent } from './feature/profile/profile.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [AuthStackGuard],
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [AuthStackGuard],
  },
  {path: '', redirectTo: 'articles', pathMatch: 'full'},
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'articles',
        component: ArticleListComponent
      },
      {
        path: 'profile',
        component: ProfileComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
