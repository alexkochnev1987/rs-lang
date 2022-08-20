import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UnitsDataService } from 'src/app/core/services/units-data.service';
import { UserDataService } from 'src/app/core/services/user-data.service';

@Component({
  selector: 'app-units-menu',
  templateUrl: './units-menu.component.html',
  styleUrls: ['./units-menu.component.scss'],
})
export class UnitsMenuComponent implements OnInit {
  units: { id: number; name: string }[] = [];
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
  }
  isRegisteredUser(i: number) {
    return i < 7 || this.userDataService.isRegistred();
  }
}
