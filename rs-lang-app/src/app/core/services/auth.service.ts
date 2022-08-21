import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { User } from '../../authorization/login/interfaceUser';
import {
  LoginResponse,
  QueryParams,
  RegisterResponse,
  url,
} from '../../authorization/constants';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private token = '';
  constructor(private http: HttpClient) {}
  login(user: User): Observable<LoginResponse> {
    return this.http
      .post<LoginResponse>(`${url + QueryParams.logIn}`, {
        email: user.email,
        password: user.password,
      })
      .pipe(
        tap(o => {
          this.setToken(o.token);
          this.setLocalStorage('auth-token', this.token);
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
  }
}
