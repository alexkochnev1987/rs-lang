import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { RouterParams } from '../../constants';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent implements OnInit {
  form: FormGroup;
  constructor(private auth: AuthService, private router: Router) {
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
      next: r => {
        this.goToLogin();
        console.log(r);
      },
      error: error => {
        this.form.enable();
        console.log(error);
      },
    });
  }
  goToLogin() {
    this.router.navigate([RouterParams.login]);
  }
}
