import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  GameStatistics,
  IWordsData,
  IWordCard,
  QueryParams,
  SLASH,
  url,
  User,
  UserSettings,
  UserStatistics,
  UserWords,
  UserWordsResponse,
  IWord,
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
    return this.http.get<IWord[]>(
      url + QueryParams.register + SLASH + userId + QueryParams.words
    );
  }

  postUserWords(wordId: string, options: IWordsData) {
    const userId = this.userDataService.getUser().userId;
    return this.http.post(
      url + QueryParams.register + SLASH + userId + QueryParams.words + wordId,
      options
    );
  }

  updateUserWords(wordId: string, options: IWordsData) {
    const userId = this.userDataService.getUser().userId;
    return this.http.put(
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

  setUserStatistics(options: GameStatistics) {
    const userId = this.userDataService.getUser().userId;
    return this.http.put<GameStatistics>(
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

  getWordById(id: string) {
    return this.http.get<IWordCard>(url + QueryParams.words + SLASH + id);
  }

  getAggregatedWords() {
    const userId = this.userDataService.getUser().userId;
    const component = `/aggregatedWords?wordsPerPage=4000&filter=${encodeURIComponent(
      '{"$nor":[{"userWord":null}]}'
    )}`;
    return this.http.get(
      url + QueryParams.register + SLASH + userId + component
    );
  }
}
