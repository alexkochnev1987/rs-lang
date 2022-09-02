import { Component, Input, OnInit } from '@angular/core';
import { Difficulty, FilterWordsByDate, IWord } from 'src/app/constants';

@Component({
  selector: 'app-graphics',
  templateUrl: './graphics.component.html',
  styleUrls: ['./graphics.component.scss'],
})
export class GraphicsComponent implements OnInit {
  @Input()
  wordsByDate!: FilterWordsByDate[];
  @Input() total!: number;
  easyWords = 0;

  constructor() {}

  ngOnInit(): void {
    // this.findEasyWords();
    console.log(this.wordsByDate);
  }

  findEasyWords(words: IWord[]) {
    return words.filter(word => word.difficulty === Difficulty.Easy).length;
  }

  findHardWords(words: IWord[]) {
    return words.filter(word => word.difficulty === Difficulty.Hard).length;
  }
}
