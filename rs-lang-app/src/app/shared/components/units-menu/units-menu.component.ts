import { Component, OnInit } from '@angular/core';
import { TextbookDataService } from 'src/app/core/services/textbook-data.service';

import { UnitsDataService } from 'src/app/core/services/units-data.service';
import { UserDataService } from 'src/app/core/services/user-data.service';

@Component({
  selector: 'app-units-menu',
  templateUrl: './units-menu.component.html',
  styleUrls: ['./units-menu.component.scss'],
  providers: [],
})
export class UnitsMenuComponent implements OnInit {
  units: { id: number; name: string }[] = [];
  currentLevel: number = 1;

  constructor(
    private unitsDataService: UnitsDataService,
    private userDataService: UserDataService,
    private textbookDataService: TextbookDataService
  ) {}

  ngOnInit(): void {
    this.units = this.unitsDataService.getUnitsForUser();
  }

  isRegisteredUser(i: number) {
    this.currentLevel = this.textbookDataService.getCurrentLevel();
    return i < 7 || this.userDataService.isRegistered();
  }
}
