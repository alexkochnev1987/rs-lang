import { Component, Input, OnInit } from '@angular/core';
import { LevelColor } from 'src/app/constants';
import { UnitsDataService } from 'src/app/core/services/units-data.service';
import { UserDataService } from 'src/app/core/services/user-data.service';

@Component({
  selector: 'app-level-navigation',
  templateUrl: './level-navigation.component.html',
  styleUrls: ['./level-navigation.component.scss'],
})
export class LevelNavigationComponent implements OnInit {
  units: LevelColor[] = [];
  @Input() currentLevel: number = 1;

  constructor(
    private unitsDataService: UnitsDataService,
    private userDataService: UserDataService
  ) {}

  ngOnInit(): void {
    this.units = this.unitsDataService.getUnitsForUser();
  }

  isRegisteredUser(i: number) {
    return i < 7 || this.userDataService.isRegistered();
  }
}
