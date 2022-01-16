import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProfileService } from 'src/app/feature/profile/profile.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isSearchVisible: boolean;
  isProfileIconVisible: boolean;
  currentUrl:string;

  constructor(private router: Router, public profileService:ProfileService) { }

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

}
