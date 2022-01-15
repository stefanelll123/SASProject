import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

  constructor(private fb: FormBuilder, private authService: AuthService) {
  }

  ngOnInit(): void {

  }

  submit(): void {

    this.isFormSubmitted = true;

    if(this.form.invalid) {
      return;
    }

    const sub = this.authService.login(this.form.value);
    sub.subscribe(val => console.log(val))
  }
}
