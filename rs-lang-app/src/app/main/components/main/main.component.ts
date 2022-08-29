import { Component, OnInit } from '@angular/core';
import { AppPages } from 'src/app/constants';
import { PagesDataService } from 'src/app/core/services/pages-data.service';
import { PageRoutes } from 'src/app/constants';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  link2 = '../' + PageRoutes.sprint;
  link1 = '../' + PageRoutes.audioChallenge;
  constructor(private pagesDataService: PagesDataService) {}
  ngOnInit(): void {
    this.pagesDataService.setPage(AppPages.Main);
  }
}
