import { Component, OnInit } from '@angular/core';
import { AppPages } from 'src/app/constants';
import { PagesDataService } from 'src/app/core/services/pages-data.service';

@Component({
  selector: 'app-sprint',
  templateUrl: './sprint.component.html',
  styleUrls: ['./sprint.component.scss'],
})
export class SprintComponent implements OnInit {
  constructor(private pageDataService: PagesDataService) {}
  ngOnInit(): void {
    this.pageDataService.setPage(AppPages.MiniGames);
  }
}
