import { Component, HostListener, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PagesDataService } from 'src/app/core/services/pages-data.service';
import { AppPages } from 'src/app/constants';
import { UserDataService } from 'src/app/core/services/user-data.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  logoParts = ['{', 'RS', '}', 'Lang'];
  isMenuInvisible = true;
  isGamesMenuInvisible = true;
  skip = true;
  currentPage = -1;
  AppPages = AppPages;

  @HostListener('window:click') onClick() {
    if (this.skip) {
      this.skip = false;
      return;
    }
    this.closeMenu();
    this.closeGamesMenu();
  }
  @HostListener('window: mousemove') onEvent() {
    this.currentPage = this.pagesDataService.getPage();
  }
  constructor(
    private userDataService:UserDataService,
    private pagesDataService: PagesDataService
  ) {}

  ngOnInit(): void {
    this.currentPage = this.pagesDataService.getPage();
  }

  showMenu() {
    this.isMenuInvisible = !this.isMenuInvisible;
    this.skip = true;
  }
  closeMenu() {
    this.isMenuInvisible = true;
  }

  closeGamesMenu() {
    this.isGamesMenuInvisible = true;
  }

  showGamesMenu() {
    this.isGamesMenuInvisible = !this.isGamesMenuInvisible;
    this.skip = true;
  }
  isUser() {
    return this.userDataService.isRegistered()
}
}
