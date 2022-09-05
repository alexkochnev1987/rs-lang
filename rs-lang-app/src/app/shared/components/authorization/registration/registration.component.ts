import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ShowUserStatus } from 'src/app/constants';
import { AuthService } from 'src/app/core/services/auth.service';
import { ShowRegistrationService } from 'src/app/core/services/show-registration.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['../authorization.component.scss'],
})
export class RegistrationComponent implements OnInit {
  form: FormGroup;
  constructor(
    private auth: AuthService,
    private showRegistration: ShowRegistrationService
  ) {
    this.form = new FormGroup({});
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl(null, [
        Validators.required,
        Validators.minLength(5),
      ]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(8),
      ]),
    });
  }

  onRegistration() {
    this.form.disable();
    console.log(this.form.value);
    this.auth.register(this.form.value).subscribe({
      next: response => {
        this.showRegistration.setUserStatus(ShowUserStatus.success);
      },
      error: error => {
        this.form.enable();
        this.showRegistration.setUserStatus(ShowUserStatus.errorRegistration);
      },
    });
  }

  goToLogin() {
    this.showRegistration.setUserStatus(ShowUserStatus.login);
  }
}
