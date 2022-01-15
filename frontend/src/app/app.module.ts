import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ColdStartComponent } from './feature/cold-start/cold-start.component';
import { ArticleListComponent } from './feature/article/article-list/article-list.component';
import { HeaderComponent } from './components/header/header.component';
import { RegisterComponent } from './feature/auth/register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TokenInterceptor } from 'src/token.interceptor';
import { LoginComponent } from './feature/auth/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    ColdStartComponent,
    ArticleListComponent,
    HeaderComponent,
    RegisterComponent,
    LoginComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule, 
    ReactiveFormsModule,
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
