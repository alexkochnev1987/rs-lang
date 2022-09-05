import { Component, OnInit } from '@angular/core';
import { ShowUserStatus } from 'src/app/constants';
import { ShowRegistrationService } from 'src/app/core/services/show-registration.service';

@Component({
  selector: 'app-error-message',
  templateUrl: './error-message.component.html',
  styleUrls: ['./error-message.component.scss'],
})
export class ErrorMessageComponent {
  constructor(private showRegistrationService: ShowRegistrationService) {}

  goToLogin() {
    this.showRegistrationService.setUserStatus(ShowUserStatus.login);
  }

  goToRegistration() {
    this.showRegistrationService.setUserStatus(ShowUserStatus.registration);
  }
}
