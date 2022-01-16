import { Component, OnInit } from '@angular/core';
import { of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ToastService } from 'src/app/components/toast/toast.service';
import { ProfileService } from './profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor(public profileService:ProfileService, private toastService: ToastService) { }

  ngOnInit(): void {
    this.getLikedArticles();
    this.getPreferences();
  }

  getLikedArticles(): void {

    const sub = this.profileService.getArticlesLiked();

    sub.pipe(
      map((response: any) => {
        console.log(response)
        this.profileService.setArticles(response.articles);
      }),
      catchError(error => {
        console.log(error)
        this.toastService.show({error: true, message: error.error.error});
        return of(error);
     })).subscribe();
  }

  getPreferences(): void {

    const sub = this.profileService.getPreferences();

    sub.pipe(
      map((response: any) => {
        console.log(response)
        this.profileService.setPreferences(response.preferences);
      }),
      catchError(error => {
        console.log(error)
        this.toastService.show({error: true, message: error.error.error});
        return of(error);
     })).subscribe();
  }
}
