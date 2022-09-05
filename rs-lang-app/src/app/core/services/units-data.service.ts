import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UnitsDataService {
  units = [
    { id: 1, name: 'LEVEL 1' },
    { id: 2, name: 'LEVEL 2' },
    { id: 3, name: 'LEVEL 3' },
    { id: 4, name: 'LEVEL 4' },
    { id: 5, name: 'LEVEL 5' },
    { id: 6, name: 'LEVEL 6' },
    { id: 7, name: 'LEVEL 7' },
  ];
  constructor() {}

  getUnitsForUser() {
    return this.units;
  }
  getUnitsForAnonym() {
    return this.units.slice(0, 6);
  }
}
