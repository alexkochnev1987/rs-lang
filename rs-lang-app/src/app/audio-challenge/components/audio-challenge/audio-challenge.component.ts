import { Component, OnInit } from '@angular/core';
import { AppPages } from 'src/app/constants';
import { PagesDataService } from 'src/app/core/services/pages-data.service';

@Component({
  selector: 'app-audio-challenge',
  templateUrl: './audio-challenge.component.html',
  styleUrls: ['./audio-challenge.component.scss'],
})
export class AudioChallengeComponent implements OnInit {
  constructor(private pageDataService: PagesDataService) {}
  ngOnInit(): void {
    this.pageDataService.setPage(AppPages.MiniGames);
  }
}
