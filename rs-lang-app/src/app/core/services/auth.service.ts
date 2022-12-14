import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Route, Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import {
  LoginResponse,
  LOCAL_KEY,
  QueryParams,
  RegisterResponse,
  url,
  User,
  SLASH,
  ShowUserStatus,
  UserWords,
  IWordCard,
  PageRoutes,
  RouterParams,
} from '../../constants';
import { LocalStorageService } from './localstorage.service';
import { ShowRegistrationService } from './show-registration.service';
import { UserDataService } from './user-data.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private localStorage: LocalStorageService,
    private http: HttpClient,
    private userDataService: UserDataService,
    private showRegistrationService: ShowRegistrationService,
    private router: Router
  ) {}
  login(user: User): Observable<LoginResponse> {
    return this.http
      .post<LoginResponse>(`${url + QueryParams.logIn}`, user)
      .pipe(
        tap(response => {
          this.userDataService.setUser(response);
          this.localStorage.setItem(LOCAL_KEY, this.userDataService.getUser());
          this.userDataService.setUserState(true);
          this.router.navigate([PageRoutes.statistics]);
        })
      );
  }

  register(user: User): Observable<User> {
    return this.http.post<RegisterResponse>(
      `${url + QueryParams.register}`,
      user
    );
  }

  editUser(user: User): Observable<User> {
    return this.http.put<RegisterResponse>(
      `${
        url +
        QueryParams.register +
        SLASH +
        this.userDataService.getUser().userId
      }`,
      user
    );
  }

  logOut() {
    this.router.navigate([RouterParams.main]);
    this.userDataService.clearUser();
    this.userDataService.setUserState(false);
    this.localStorage.clear();
    this.showRegistrationService.setUserStatus(ShowUserStatus.login);
  }

  refreshToken() {
    return this.http
      .get(
        `${
          url +
          QueryParams.register +
          SLASH +
          this.userDataService.getUser().userId
        }/tokens`
      )
      .pipe(
        tap(response => {
          this.userDataService.setUser(response);
          this.localStorage.setItem(LOCAL_KEY, this.userDataService.getUser());
          this.userDataService.setUserState(true);
        })
      );
  }

  getUserName() {
    return this.http.get<User>(
      `${url + QueryParams.register + SLASH}${
        this.userDataService.getUser().userId
      }`
    );
  }
}
