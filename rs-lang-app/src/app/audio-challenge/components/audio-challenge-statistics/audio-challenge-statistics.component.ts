import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  AUDIO_CHALLENGE_ATTEMPTS,
  IAudioChallengeStatistics,
  SLASH,
  url,
  TITLE_GAME_STATISTICS,
} from 'src/app/constants';

@Component({
  selector: 'app-audio-challenge-statistics',
  templateUrl: './audio-challenge-statistics.component.html',
  styleUrls: ['./audio-challenge-statistics.component.scss'],
})
export class AudioChallengeStatisticsComponent {
  totalAttempts = AUDIO_CHALLENGE_ATTEMPTS;
  title = TITLE_GAME_STATISTICS;
  source = url + SLASH;
  mainPageLink = '../../../';
  backlink = '../../';

  constructor() {}
  @Input() gameStatistics?: IAudioChallengeStatistics[];
  @Input() duration: number = 0;
  @Input() rightAnswersCount: number = 0;
  @Input() rightAnswersPercent: number = 0;
  @Output() playAgain = new EventEmitter<boolean>();
  playGame(value: any) {
    this.playAgain.emit(value);
  }

  playAudio(urlocation: string) {
    const audio = new Audio(this.source + urlocation);
    audio.play();
  }
}
