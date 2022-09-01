import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  IWordCard,
  QueryParams,
  SLASH,
  url,
  User,
  UserSettings,
  UserStatistics,
  UserWords,
  UserWordsResponse,
} from 'src/app/constants';
import { UserDataService } from '../services/user-data.service';

@Injectable({
  providedIn: 'root',
})
export class QueryService {
  constructor(
    private http: HttpClient,
    private userDataService: UserDataService
  ) {}

  updateUser(user: Partial<User>) {
    const userId = this.userDataService.getUser().userId;
    return this.http.put(
      url + QueryParams.register + SLASH + userId + QueryParams.words,
      user
    );
  }

  getUserWords() {
    const userId = this.userDataService.getUser().userId;
    return this.http.get<UserWordsResponse[]>(
      url + QueryParams.register + SLASH + userId + QueryParams.words
    );
  }

  postUserWords(wordId: string, options: UserWords) {
    const userId = this.userDataService.getUser().userId;
    return this.http.post(
      url + QueryParams.register + SLASH + userId + QueryParams.words + wordId,
      options
    );
  }

  getUserStatistics() {
    const userId = this.userDataService.getUser().userId;
    return this.http.get<UserStatistics>(
      url + QueryParams.register + SLASH + userId + QueryParams.statistics
    );
  }

  setUserStatistics(options: UserStatistics) {
    const userId = this.userDataService.getUser().userId;
    return this.http.put<UserStatistics>(
      url + '/users/' + userId + '/statistics',
      options
    );
  }
  getUserSettings() {
    const userId = this.userDataService.getUser().userId;
    return this.http.get<UserSettings>(
      url + QueryParams.register + SLASH + userId + QueryParams.settings
    );
  }

  setUserSettings(options: UserSettings) {
    const userId = this.userDataService.getUser().userId;
    return this.http.put<UserSettings>(
      url + QueryParams.register + SLASH + userId + QueryParams.settings,
      options
    );
  }
  getAggregatedWords() {
    const userId = this.userDataService.getUser().userId;
    const queryUrl =
      url +
      QueryParams.register +
      SLASH +
      userId +
      QueryParams.aggregatedWords +
      '?difficulty=hard';
    console.log(queryUrl);
    return this.http.get<UserSettings>(queryUrl);
  }

  getWordById(id: string) {
    return this.http.get<IWordCard>(url + QueryParams.words + SLASH + id);
  }
}
