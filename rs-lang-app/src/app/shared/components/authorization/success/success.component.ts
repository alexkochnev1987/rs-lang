import { Component, OnInit } from '@angular/core';
import { ShowUserStatus } from 'src/app/constants';
import { ShowRegistrationService } from 'src/app/core/services/show-registration.service';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.scss'],
})
export class SuccessComponent {
  constructor(private showRegistrationService: ShowRegistrationService) {}

  goToLogin() {
    this.showRegistrationService.setUserStatus(ShowUserStatus.login);
  }

  goToRegistration() {
    this.showRegistrationService.setUserStatus(ShowUserStatus.registration);
  }
}
