import { Component, OnInit } from '@angular/core';
import { ShowUserStatus, User } from 'src/app/constants';
import { AuthService } from 'src/app/core/services/auth.service';
import { ShowRegistrationService } from 'src/app/core/services/show-registration.service';
import { UserDataService } from 'src/app/core/services/user-data.service';

@Component({
  selector: 'app-user-statistics',
  templateUrl: './user-statistics.component.html',
  styleUrls: ['./user-statistics.component.scss'],
})
export class UserStatisticsComponent implements OnInit {
  userName = '';
  constructor(
    private auth: AuthService,
    private userDataService: UserDataService,
    private showRegistrationService: ShowRegistrationService
  ) {}

  ngOnInit(): void {
    this.getUserName();
  }

  getUserName() {
    this.auth.getUserName().subscribe({
      next: response => {
        const user = response as User;
        if (user.name) this.userDataService.setUserName(user.name);
        this.userName = this.userDataService.getUserName();
      },
    });
  }

  logOut() {
    this.showRegistrationService.setUserStatus(ShowUserStatus.login);
    this.auth.logOut();
    this.userDataService.setUserState(false);
    this.userName = '';
    this.userDataService.setUserName('');
  }
}
