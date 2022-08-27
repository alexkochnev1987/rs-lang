import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import {
  LoginResponse,
  LOCAL_KEY,
  QueryParams,
  RegisterResponse,
  url,
  User,
  SLASH,
  LoginUserResponse,
} from '../../constants';
import { LocalStorageService } from './localstorage.service';
import { UserDataService } from './user-data.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private localStorage: LocalStorageService,
    private http: HttpClient,
    private userDataService: UserDataService
  ) {}
  login(user: User): Observable<LoginResponse> {
    return this.http
      .post<LoginResponse>(`${url + QueryParams.logIn}`, user)
      .pipe(
        tap(response => {
          this.userDataService.setUser(response);
          this.localStorage.setItem(LOCAL_KEY, this.userDataService.getUser());
          this.userDataService.setUserState(true);
        })
      );
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
