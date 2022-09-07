import { Component, OnInit } from '@angular/core';
import {
  GameStatistics,
  PageRoutes,
  QueryParams,
  SLASH,
  url,
  UserStatistics,
} from 'src/app/constants';
import { AppPages } from 'src/app/constants';
import { PagesDataService } from 'src/app/core/services/pages-data.service';
import { QueryService } from 'src/app/core/service/query.service';
import { HttpClient } from '@angular/common/http';
import { UserDataService } from 'src/app/core/services/user-data.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss'],
})
export class StatisticsComponent implements OnInit {
  link2 = '../' + PageRoutes.sprint;
  link1 = '../audio-challenge';
  link1Level = -1;
  link1Page = -1;
  statistics: UserStatistics | undefined;
  isDesktop = true;

  constructor(
    private pagesDataService: PagesDataService,
    private queryService: QueryService,
    private userDataService: UserDataService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.pagesDataService.setPage(AppPages.DashBoard);
    this.getStatistics();
    if (window.visualViewport!.width < 1280) this.isDesktop = false;
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
                  next: res => {
                    this.statistics = res;
                  },
                });
              });
          } else {
            this.queryService.getUserStatistics().subscribe({
              next: res => {
                this.statistics = res;
              },
            });
          }
        },
      });
  }
}
