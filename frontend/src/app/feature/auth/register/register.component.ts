import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ToastService } from 'src/app/components/toast/toast.service';
import { GlobalErrorsEnum } from 'src/app/interfaces/global-errors.enum';
import { AuthService } from '../auth.service';

enum RegisterStepsEnum {
  firstStep = 1,
  secondStep = 2,
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  form: FormGroup = this.fb.group({
    firstName: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
  });
  registerStep = RegisterStepsEnum.firstStep;
  registerStepsEnum = RegisterStepsEnum;
  errorsEnum = GlobalErrorsEnum;
  isFormSubmitted = false;
  preferences=null;
  selectedPreferences=[];

  constructor(private fb: FormBuilder, private authService: AuthService,  private toastService:ToastService, private router: Router) {
  }

  ngOnInit(): void {

    this.preferences = this.authService.preferences;
  }

  modifyPreferences(item) {

    const indexOfSelectedItem = this.selectedPreferences.indexOf(item.id);

    indexOfSelectedItem === -1 ? this.selectedPreferences.push(item.id) : this.selectedPreferences.splice(indexOfSelectedItem,1)
  }

  submit(): void {

    this.isFormSubmitted = true;

    if(this.form.invalid || this.selectedPreferences.length < 3) {
      return;
    }

    const payload = {
      ...this.form.value,
      preferences: this.selectedPreferences
    }

    const sub = this.authService.register(payload);

    sub.pipe(
      map((response: any) => {
        this.toastService.show({error: false, message: 'You have successfully registered!'});
        this.router.navigate(['login']);
      }),
      catchError(error => {
        this.toastService.show({error: true, message: error.error.error});
        return of(error);
     })).subscribe();
  }

  goToSecondStep():void {

    this.isFormSubmitted = true;

    if(this.form.invalid) {
      return;
    }

    this.isFormSubmitted = false;
    this.registerStep = RegisterStepsEnum.secondStep
  }

  goToTheFirstStep(): void {

    this.isFormSubmitted = false;
    this.registerStep = RegisterStepsEnum.firstStep
  }
}
