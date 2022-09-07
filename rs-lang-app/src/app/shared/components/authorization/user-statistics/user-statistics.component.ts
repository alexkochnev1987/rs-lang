import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { QueryParamsHandling } from '@angular/router';
import {
  Difficulty,
  GameStatistics,
  QueryParams,
  ShowUserStatus,
  SLASH,
  url,
  User,
} from 'src/app/constants';
import { QueryService } from 'src/app/core/service/query.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { ShowRegistrationService } from 'src/app/core/services/show-registration.service';
import { UserDataService } from 'src/app/core/services/user-data.service';

@Component({
  selector: 'app-user-statistics',
  templateUrl: './user-statistics.component.html',
  styleUrls: ['../authorization.component.scss'],
})
export class UserStatisticsComponent implements OnInit {
  userName = '';
  learnedWord = 0;
  wordsPerDay = 0;
  userWords = { hardWords: 0, easyWords: 0, total: 0 };
  constructor(
    private auth: AuthService,
    private userDataService: UserDataService,
    private showRegistrationService: ShowRegistrationService,
    private queryService: QueryService,
    private http: HttpClient
  ) {}

  updateUser() {
    this.showRegistrationService.setUserStatus(ShowUserStatus.update);
  }

  getSettings() {
    this.queryService.getUserSettings().subscribe({
      next: response => {
        this.wordsPerDay = response.wordsPerDay;
      },
      error: error => console.log(error),
    });
  }

  getStatistics() {
    this.http
      .get(
        url +
          QueryParams.register +
          SLASH +
          this.userDataService.getUser().userId +
          `/aggregatedWords?wordsPerPage=4000&filter=${encodeURIComponent(
            '{"$nor":[{"userWord":null}]}'
          )}`
      )
      .subscribe({
        next: (data: any) => {
          if (data[0].paginatedResults.length === 0) {
            const optionsStats: GameStatistics = {
              learnedWords: 0,
              optional: {
                sprint: {
                  today: {
                    attempts: 0,
                    success: 0,
                    rightGuessesInRow: 0,
                    date: 0,
                  },
                  allTime: {
                    attempts: 0,
                    success: 0,
                    rightGuessesInRow: 0,
                  },
                },
                audioChallenge: {
                  today: {
                    attempts: 0,
                    success: 0,
                    rightGuessesInRow: 0,
                    date: 0,
                  },
                  allTime: {
                    attempts: 0,
                    success: 0,
                    rightGuessesInRow: 0,
                  },
                },
              },
            };
            this.http
              .put<GameStatistics>(
                url +
                  QueryParams.register +
                  SLASH +
                  this.userDataService.getUser().userId +
                  QueryParams.statistics,
                optionsStats
              )
              .subscribe(() => {
                this.queryService.getUserStatistics().subscribe({
                  next: response => {
                    this.learnedWord = response.learnedWords;
                  },
                  error: error => console.log(error),
                });
              });
          } else {
            this.queryService.getUserStatistics().subscribe({
              next: response => {
                this.learnedWord = response.learnedWords;
              },
              error: error => console.log(error),
            });
          }
        },
      });
  }

  getWords() {
    this.queryService.getUserWords().subscribe({
      next: response => {
        this.userWords.total = response.length;
        this.userWords.easyWords = response.filter(
          word => word.difficulty === Difficulty.Easy
        ).length;
        this.userWords.hardWords = response.filter(
          word => word.difficulty === Difficulty.Hard
        ).length;
      },
    });
  }

  ngOnInit(): void {
    this.getUserName();
    this.getStatistics();
    this.getWords();
  }

  getUserName() {
    this.auth.getUserName().subscribe({
      next: response => {
        const user = response as User;
        if (user.name) this.userDataService.setUserName(user.name);
        this.userName = this.userDataService.getUserName();
      },
    });
  }

  logOut() {
    this.showRegistrationService.setUserStatus(ShowUserStatus.login);
    this.auth.logOut();
    this.userDataService.setUserState(false);
    this.userName = '';
    this.userDataService.setUserName('');
  }
}
