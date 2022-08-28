import { Component, OnInit } from '@angular/core';
import { AppPages } from 'src/app/constants';
import { PagesDataService } from 'src/app/core/services/pages-data.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  constructor(private pagesDataService: PagesDataService) {}
  ngOnInit(): void {
    this.pagesDataService.setPage(AppPages.Main);
  }
}
