import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
    password: ['', [Validators.required]],
  });
  errorsEnum = GlobalErrorsEnum;
  isFormSubmitted = false;
  registerStep = RegisterStepsEnum.firstStep;
  registerStepsEnum = RegisterStepsEnum;
  preferences= [];
  items= [
    {
      id:1,
      name: 'Mobile Application'
    },
    {
      id:2,
      name: 'Web Application'
    },
    {
      id:3,
      name: 'Quality Assurance'
    },
    {
      id:4,
      name: 'Database administrator'
    },
    {
      id:5,
      name: 'Network administrator'
    },
    {
      id:6,
      name: 'Web Application'
    },
    {
      id:7,
      name: 'Quality Assurance'
    },
    {
      id:8,
      name: 'Database administrator'
    },
    {
      id:9,
      name: 'Network administrator'
    },
    {
      id:10,
      name: 'Web Application'
    },
    {
      id:11,
      name: 'Quality Assurance'
    },
    {
      id:12,
      name: 'Database administrator'
    },
    {
      id:13,
      name: 'Network administrator'
    }
  ]

  constructor(private fb: FormBuilder, private authService: AuthService) {
  }

  ngOnInit(): void {

  }

  modifyPreferences(item) {

    const indexOfSelectedItem = this.preferences.indexOf(item.id);

    indexOfSelectedItem === -1 ? this.preferences.push(item.id) : this.preferences.splice(indexOfSelectedItem,1)

    console.log(this.preferences);
  }

  submit(): void {

    this.isFormSubmitted = true;

    if(this.form.invalid || this.preferences.length < 3) {
      return;
    }

    const payload = {
      ...this.form.value,
      preferences: this.preferences
    }

    console.log(payload)

    const sub = this.authService.register(payload);
    sub.subscribe(val => console.log(val))
  }

  goToSecondStep():void {

    this.isFormSubmitted = true;

    if(this.form.invalid) {
      return;
    }

    this.isFormSubmitted = false;
    this.registerStep = RegisterStepsEnum.secondStep
  }
}
