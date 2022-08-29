import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ShowUserStatus } from 'src/app/constants';
import { QueryService } from 'src/app/core/service/query.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { ShowRegistrationService } from 'src/app/core/services/show-registration.service';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['../authorization.component.scss'],
})
export class UpdateUserComponent implements OnInit {
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
    this.auth.getUserName().subscribe({
      next: response => {
        this.form = new FormGroup({
          name: new FormControl(response.name, [
            Validators.required,
            Validators.minLength(5),
          ]),
          email: new FormControl(response.email, [
            Validators.required,
            Validators.email,
          ]),
          password: new FormControl(null, [
            Validators.required,
            Validators.minLength(8),
          ]),
        });
      },
    });
  }

  editUser() {
    this.form.disable();
    this.auth.editUser(this.form.value).subscribe({
      next: response => {
        this.goToStatistics();
      },
      error: error => {
        this.form.enable();
      },
    });
  }

  goToStatistics() {
    this.showRegistration.setUserStatus(ShowUserStatus.statistics);
  }
}
