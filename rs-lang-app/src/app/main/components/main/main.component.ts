import { Component, OnInit } from '@angular/core';
import { PageRoutes } from 'src/app/constants';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent {
  link2 = '../' + PageRoutes.sprint;
  link1 = '../' + PageRoutes.audioChallenge;
  constructor() {}
}
