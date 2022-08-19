import { Component, OnInit } from '@angular/core';
import { UnitsDataService } from 'src/app/services/data-services/units-data.service';

@Component({
  selector: 'app-units-menu',
  templateUrl: './units-menu.component.html',
  styleUrls: ['./units-menu.component.scss'],
})
export class UnitsMenuComponent implements OnInit {
  units: { id: number; name: string }[] = [];
  constructor(private unitsDataService: UnitsDataService) {}

  ngOnInit(): void {
    if (true) {
      // here will be implemented checking : user or anonym
      // вместо  должна быть проверка: пользователь или аноним
      this.units = this.unitsDataService.getUnitsForUser();
    } else {
      // eslint-disable-next-line prettier/prettier
    this.units = this.unitsDataService.getUnitsForAnonym();
    }
  }
}
