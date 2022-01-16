import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ToastService } from 'src/app/components/toast/toast.service';
import { GlobalErrorsEnum } from 'src/app/interfaces/global-errors.enum';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });
  errorsEnum = GlobalErrorsEnum;
  isFormSubmitted = false;

  constructor(private fb: FormBuilder, private authService: AuthService,  private toastService:ToastService, private router: Router) {
  }

  ngOnInit(): void {

  }

  submit(): void {

    this.isFormSubmitted = true;

    if(this.form.invalid) {
      return;
    }

    const sub = this.authService.login(this.form.value);

    sub.pipe(
      map((response: any) => {
        console.log(response)
        this.toastService.show({error: false, message: 'You have successfully logged in!'});
        localStorage.setItem('access_token', response.token)
        delete response.token;
        localStorage.setItem('user', JSON.stringify(response))
        this.router.navigate(['/articles']);
      }),
      catchError(error => {
        console.log(error)
        this.toastService.show({error: true, message: error.error.error});
        return of(error);
     })).subscribe();
  }
}
