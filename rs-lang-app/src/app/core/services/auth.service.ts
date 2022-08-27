import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, retry, tap, map, catchError, throwError } from 'rxjs';
import {
  LoginResponse,
  LOCAL_KEY,
  QueryParams,
  RegisterResponse,
  url,
  User,
  SLASH,
  LoginUserResponse,
  ShowUserStatus,
} from '../../constants';
import { LocalStorageService } from './localstorage.service';
import { ShowRegistrationService } from './show-registration.service';
import { UserDataService } from './user-data.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // private user: Partial<LoginResponse> = {};
  constructor(
    private localStorage: LocalStorageService,
    private http: HttpClient,
    private userDataService: UserDataService,
    private showRegistrationService: ShowRegistrationService
  ) {}
  login(user: User): Observable<LoginResponse> {
    return this.http
      .post<LoginResponse>(`${url + QueryParams.logIn}`, user)
      .pipe(
        tap(response => {
          this.userDataService.setUser(response);
          this.setLocalStorage(LOCAL_KEY, this.userDataService.getUser());
          this.userDataService.setUserState(true);
        })
      );
  }

  setLocalStorage(key: string, value: any) {
    this.localStorage.setItem(key, value);
  }

  register(user: User): Observable<User> {
    return this.http.post<RegisterResponse>(
      `${url + QueryParams.register}`,
      user
    );
  }

  logOut() {
    this.userDataService.clearUser();
    this.userDataService.setUserState(false);
    this.localStorage.clear();
  }

  refreshToken() {
    console.log('Start refresh');
    return this.http
      .get(
        `${url + QueryParams.register + SLASH}${
          this.userDataService.getUser().userId
        }/tokens`
      )
      .pipe(
        tap(response => {
          this.userDataService.setUser(response);
          this.setLocalStorage(LOCAL_KEY, this.userDataService.getUser());
          this.userDataService.setUserState(true);
        })
      );
  }

  getUserName() {
    return this.http.get(
      `${url + QueryParams.register + SLASH}${
        this.userDataService.getUser().userId
      }`
    );
  }
}
