import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  login = true;
  username = '';
  form: FormGroup;
  constructor(private auth: AuthService) {
    this.form = new FormGroup({});
  }

  ngOnInit(): void {
    this.switchLogin();
  }
  switchRegister() {
    this.login = false;
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
  switchLogin() {
    this.login = true;
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
      next: r => {
        this.username = r.name;
        console.log(r);
      },
      error: error => {
        this.form.enable();
        console.log(error);
      },
    });
  }
  onRegistration() {
    this.form.disable();
    console.log(this.form.value);
    this.auth.register(this.form.value).subscribe({
      next: r => {
        console.log(r);
      },
      error: error => {
        this.form.enable();
        console.log(error);
      },
    });
  }
  logOut() {
    this.auth.logOut();
    this.login = true;
    this.username = '';
    this.switchLogin();
  }
}
