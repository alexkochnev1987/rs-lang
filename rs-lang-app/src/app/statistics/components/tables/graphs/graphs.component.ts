import { Component, OnInit } from '@angular/core';
import {
  IWordCard,
  StatisticsState,
  StatisticsStateObject,
} from 'src/app/constants';

@Component({
  selector: 'app-graphs',
  templateUrl: './graphs.component.html',
  styleUrls: ['./graphs.component.scss'],
})
export class GraphsComponent {
  page = 1;
  totalPages: [IWordCard[]] = [[]];
  state: string = StatisticsState.allTime;
  stateObject = StatisticsStateObject;
  constructor() {}

  changeState(newState: string) {
    this.state = newState;
  }
}
