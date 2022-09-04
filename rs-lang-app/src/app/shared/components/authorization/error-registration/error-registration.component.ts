import { Component, OnInit } from '@angular/core';
import { ShowUserStatus } from 'src/app/constants';
import { ShowRegistrationService } from 'src/app/core/services/show-registration.service';

@Component({
  selector: 'app-error-registration',
  templateUrl: './error-registration.component.html',
  styleUrls: ['./error-registration.component.scss'],
})
export class ErrorRegistrationComponent {
  constructor(private showRegistrationService: ShowRegistrationService) {}

  goToLogin() {
    this.showRegistrationService.setUserStatus(ShowUserStatus.login);
  }

  goToRegistration() {
    this.showRegistrationService.setUserStatus(ShowUserStatus.registration);
  }
}
