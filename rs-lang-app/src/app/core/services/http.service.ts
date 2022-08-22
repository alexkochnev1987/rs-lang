import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SOURCE } from 'src/app/constants';

@Injectable({
  providedIn: 'root',
})
export class HttpService {

  constructor(private http: HttpClient) {}

  getData(url: string = '') {
    return this.http.get(SOURCE + url);
  }

}
