import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './login/interfaceUser';
import { LoginResponse, QueryParams, RegisterResponse, url } from './constants';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}
  login(user: User): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${url + QueryParams.logIn}`, {
      email: user.email,
      password: user.password,
    });
  }
  register(user: User): Observable<User> {
    return this.http.post<RegisterResponse>(
      `${url + QueryParams.register}`,
      user
    );
  }
}
