import { Component, OnInit } from '@angular/core';
import { ShowRegistrationService } from 'src/app/core/services/show-registration.service';

@Component({
  selector: 'app-authorization',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.scss'],
})
export class AuthorizationComponent {
  constructor(private showRegistration: ShowRegistrationService) {}

  getRegistrationState() {
    return this.showRegistration.getState();
  }
}
