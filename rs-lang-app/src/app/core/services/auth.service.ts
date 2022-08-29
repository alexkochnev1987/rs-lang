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
  ShowUserStatus,
  UserWords,
  IWordCard,
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
    private showRegistrationService: ShowRegistrationService
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
    this.userDataService.clearUser();
    this.userDataService.setUserState(false);
    this.localStorage.clear();
    this.showRegistrationService.setUserStatus(ShowUserStatus.login);
  }

  refreshToken() {
    console.log('this.refreshToken');
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

  getWordById(id: string) {
    return this.http.get<IWordCard>(url + QueryParams.words + SLASH + id);
  }
}
