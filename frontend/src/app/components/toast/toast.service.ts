import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor() {
  }

  private showSubject = new Subject();

  public get(): Observable<any> {
      return this.showSubject.asObservable();
  }

  public show(message): void {
      this.showSubject.next(message);
  }

  public hide(): void {
      this.showSubject.next();
  }
}
