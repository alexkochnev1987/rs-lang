import { Injectable } from '@angular/core';
import { LEVELS_COLORS } from 'src/app/constants';

@Injectable({
  providedIn: 'root',
})
export class UnitsDataService {
  units = LEVELS_COLORS;
  constructor() {}

  getUnitsForUser() {
    return this.units;
  }
  getUnitsForAnonym() {
    return this.units.slice(0, 6);
  }
}
