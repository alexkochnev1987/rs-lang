import { HttpClient, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IWordCard, url } from 'src/app/constants';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private http: HttpClient) {}

  getData(endpoint: string = '', options: any = {}) {
    return this.http.get(url + endpoint, options);
  }

  postData(endpoint: string = '', options: any = {}) {
    return this.http.post(url + endpoint, options);
  }
  putData(endpoint: string = '', options: any = {}) {
    return this.http.put(url + endpoint, options);
  }
  deleteData(endpoint: string = '', options: any = {}) {
    return this.http.delete(url + endpoint, options);
  }
}
