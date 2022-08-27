import { Component, OnInit } from '@angular/core';
import { LOCAL_KEY, LoginResponse } from './constants';
import { AuthService } from './core/services/auth.service';
import { LocalStorageService } from './core/services/localstorage.service';
import { UserDataService } from './core/services/user-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'rs-lang-app';
  constructor(
    private localStorage: LocalStorageService,
    private auth: AuthService,
    private userDataService: UserDataService
  ) {}

  ngOnInit(): void {
    const potentialToken = this.localStorage.getItem(
      LOCAL_KEY
    ) as Partial<LoginResponse>;
    if (
      potentialToken.userId &&
      potentialToken.token &&
      potentialToken.refreshToken
    ) {
      this.userDataService.setUser(potentialToken);
      this.userDataService.setUserState(true);
    }
  }
}
