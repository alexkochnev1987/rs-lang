import { Component, OnInit } from '@angular/core';
import { ShowUserStatus } from 'src/app/constants';
import { ShowRegistrationService } from 'src/app/core/services/show-registration.service';
import { UserDataService } from 'src/app/core/services/user-data.service';

@Component({
  selector: 'app-authorization',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.scss'],
})
export class AuthorizationComponent implements OnInit {
  constructor(
    private showRegistration: ShowRegistrationService,
    private userDataService: UserDataService
  ) {}

  ngOnInit(): void {
    if (this.userDataService.isRegistered()) {
      this.showRegistration.setUserStatus(ShowUserStatus.statistics);
    }
  }

  getUserState() {
    return this.userDataService.isRegistered();
  }

  getState() {
    return this.showRegistration.getUserStatus();
  }

  isLogin() {
    return this.getState() === ShowUserStatus.login ? true : false;
  }

  isRegistration() {
    return this.getState() === ShowUserStatus.registration ? true : false;
  }

  isStatistics() {
    return this.getState() === ShowUserStatus.statistics ? true : false;
  }

  isUpdate() {
    return this.getState() === ShowUserStatus.update ? true : false;
  }

  isError() {
    return this.getState() === ShowUserStatus.errorLogin ? true : false;
  }

  isErrorRegistration() {
    return this.getState() === ShowUserStatus.errorRegistration ? true : false;
  }

  isSuccess() {
    return this.getState() === ShowUserStatus.success ? true : false;
  }
}
