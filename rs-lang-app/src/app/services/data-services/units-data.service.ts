import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UnitsDataService {
  units = [
    { id: 1, name: 'UNIT 1' },
    { id: 2, name: 'UNIT 2' },
    { id: 3, name: 'UNIT 3' },
    { id: 4, name: 'UNIT 4' },
    { id: 5, name: 'UNIT 5' },
    { id: 6, name: 'UNIT 6' },
    { id: 7, name: 'UNIT 7' },
  ];
  constructor() {}

  getUnitsForUser() {
    return this.units;
  }
  getUnitsForAnonym() {
    return this.units.slice(0, 6);
  }
}
