import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  currentUser= null;
  constructor() { }

  setCurrentUser() {
    const user = JSON.parse(localStorage.getItem('user'));
    this.currentUser = user;
  }
}
