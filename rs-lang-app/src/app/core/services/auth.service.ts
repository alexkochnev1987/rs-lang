import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import {
  LocalStorageKeys,
  LoginResponse,
  QueryParams,
  RegisterResponse,
  url,
  User,
} from '../../constants';
import { LocalStorageService } from './localstorage.service';
import { UserDataService } from './user-data.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private token = '';
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
          this.setToken(response.token);
          Object.keys(response).forEach(key => {
            if (
              key === LocalStorageKeys.token ||
              key === LocalStorageKeys.refreshToken ||
              key === LocalStorageKeys.userId
            ) {
              this.setLocalStorage(key, response[key]);
            }
          });
          this.userDataService.setUserState(true);
        })
      );
  }

  setToken(token: string) {
    this.token = token;
  }

  getToken() {
    return this.token;
  }

  setLocalStorage(key: string, value: string) {
    localStorage.setItem(key, value);
  }

  register(user: User): Observable<User> {
    return this.http.post<RegisterResponse>(
      `${url + QueryParams.register}`,
      user
    );
  }

  logOut() {
    this.setToken('');
    this.userDataService.setUserState(false);
    this.localStorage.clear();
  }
}
