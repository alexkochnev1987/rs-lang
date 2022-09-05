import { Injectable } from '@angular/core';
import { ShowUserStatus } from 'src/app/constants';

@Injectable({
  providedIn: 'root',
})
export class ShowRegistrationService {
  private userStatus: ShowUserStatus = ShowUserStatus.login;

  getUserStatus() {
    return this.userStatus;
  }
  setUserStatus(status: ShowUserStatus) {
    this.userStatus = status;
  }
}
