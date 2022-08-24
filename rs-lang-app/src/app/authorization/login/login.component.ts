import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { RouterParams } from '../../constants';
import { ShowRegistrationService } from 'src/app/core/services/show-registration.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  username: string | null;
  form: FormGroup;
  constructor(
    private auth: AuthService,
    // private router: Router,
    private showRegistration: ShowRegistrationService
  ) {
    this.username = null;
    this.form = new FormGroup({});
  }

  ngOnInit(): void {
    this.validateFom();
  }

  validateFom() {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(8),
      ]),
    });
  }

  onSubmit() {
    this.form.disable();
    console.log(this.form.value);
    this.auth.login(this.form.value).subscribe({
      next: response => {
        this.username = response.name;
      },
      error: error => {
        this.form.enable();
        console.log(error);
      },
    });
  }

  logOut() {
    this.auth.logOut();
    this.username = '';
    this.validateFom();
  }

  goToRegistration() {
    this.showRegistration.setState(true);
    // this.router.navigate([RouterParams.registration]);
  }
}
