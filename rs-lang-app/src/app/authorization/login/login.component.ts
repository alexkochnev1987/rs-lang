import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { User } from '../../constants';
import { ShowRegistrationService } from 'src/app/core/services/show-registration.service';
import { UserDataService } from 'src/app/core/services/user-data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  isUser = false;
  form: FormGroup;
  userName = '';
  constructor(
    private auth: AuthService,
    private showRegistration: ShowRegistrationService,
    private userDataService: UserDataService
  ) {
    this.form = new FormGroup({});
  }

  ngOnInit(): void {
    this.validateFom();
    this.getUserName();
    this.isUser = this.userDataService.isRegistered();
    this.userName = this.userDataService.getUserName();
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
        this.getUserName();
        this.isUser = this.userDataService.isRegistered();
      },
      error: error => {
        this.form.enable();
        console.log(error);
      },
    });
  }

  logOut() {
    this.getUserName();
    this.auth.logOut();
    this.userDataService.setUserState(false);
    this.isUser = false;
    this.validateFom();
    this.userName = '';
    this.userDataService.setUserName('');
  }

  goToRegistration() {
    this.showRegistration.setState(true);
  }
  getUserName() {
    this.auth.getUserName().subscribe({
      next: response => {
        const user = response as User;
        if (user.name) this.userDataService.setUserName(user.name);
      },
    });
  }
}
