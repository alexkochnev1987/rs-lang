import { Component, OnInit } from '@angular/core';
import { QueryParamsHandling } from '@angular/router';
import { ShowUserStatus, url, User } from 'src/app/constants';
import { QueryService } from 'src/app/core/service/query.service';
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
  learnedWord = 0;
  wordsPerDay = 0;
  constructor(
    private auth: AuthService,
    private userDataService: UserDataService,
    private showRegistrationService: ShowRegistrationService,
    private queryService: QueryService
  ) {}

  updateUser() {
    this.showRegistrationService.setUserStatus(ShowUserStatus.update);
  }

  getSettings() {
    this.queryService.getUserSettings().subscribe({
      next: response => {
        this.wordsPerDay = response.wordsPerDay;
      },
      error: error => alert(`Settings not found`),
    });
  }

  getStatistics() {
    this.queryService.getUserStatistics().subscribe({
      next: response => {
        this.learnedWord = response.learnedWords;
      },
      error: error => alert(`Statistics not found`),
    });
  }

  ngOnInit(): void {
    this.getUserName();
    this.getSettings();
    this.getStatistics();
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
