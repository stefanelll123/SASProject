import { Component, OnInit } from '@angular/core';
import { ProfileService } from 'src/app/feature/profile/profile.service';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnInit {

  constructor(private profileService: ProfileService) { }

  ngOnInit(): void {
    this.profileService.setCurrentUser();
  }

}
