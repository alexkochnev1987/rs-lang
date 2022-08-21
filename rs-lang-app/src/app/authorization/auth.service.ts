import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './components/authorization/interfaceUser';
import { LoginResponse, signInURL } from './constants';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}
  login(user: User): Observable<LoginResponse> {
    console.log(user);
    return this.http.post<LoginResponse>(signInURL, {
      email: user.email,
      password: user.password,
    });
  }
  register() {}
}
