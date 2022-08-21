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
import { UserDataService } from './user-data.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private token = '';
  constructor(
    private http: HttpClient,
    private userDataService: UserDataService
  ) {}
  login(user: User): Observable<LoginResponse> {
    return this.http
      .post<LoginResponse>(`${url + QueryParams.logIn}`, user)
      .pipe(
        tap(response => {
          this.setToken(response.token);
          this.setLocalStorage(LocalStorageKeys.token, this.token);
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
  }
}
