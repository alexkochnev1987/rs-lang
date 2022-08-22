/* eslint-disable @angular-eslint/no-output-on-prefix */
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
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
  unitNumber = 0;
  @Output() onLink = new EventEmitter<number>();
  getLink(id: number) {
    this.onLink.emit(id);
  }
  constructor(
    private unitsDataService: UnitsDataService,
    private router: Router,
    private userDataService: UserDataService
  ) {}

  ngOnInit(): void {
    this.units = this.unitsDataService.getUnitsForUser();
  }

  goOnLink(id: number) {
    this.router.navigate(['textbook', id]);
    this.unitNumber = id;
  }

  isRegisteredUser(i: number) {
    return i < 7 || this.userDataService.isRegistred();
  }
}
