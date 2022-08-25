import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LocalStorageKeys, QueryParams, url } from 'src/app/constants';
import { LocalStorageService } from '../localstorage.service';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GetUserService {
  private url = '';
  constructor(
    private http: HttpClient,
    private localStorage: LocalStorageService
  ) {
    this.url = `${url + QueryParams.register}/`;
  }
  getUser() {
    console.log(this.localStorage.getItem(LocalStorageKeys.userId));
    console.log(this.url + this.localStorage.getItem(LocalStorageKeys.userId));
    return this.http
      .get(this.url + this.localStorage.getItem(LocalStorageKeys.userId))
      .pipe(
        tap(response => {
          console.log(response);
        })
      );
  }
}
