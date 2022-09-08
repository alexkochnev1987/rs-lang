import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { AuthorizationModule } from 'src/app/authorization/authorization.module';
import { AppPages } from 'src/app/constants';
import { PagesDataService } from 'src/app/core/services/pages-data.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
})
export class AboutComponent implements OnInit {
  isDesktop = true;
  isTablet = false;
  isPhone = false;
  auth?: AuthorizationModule;

  constructor(private pagesDataService: PagesDataService) {}
  ngOnInit(): void {
    this.auth = new AuthorizationModule();
    this.pagesDataService.setPage(AppPages.About);
    this.checkScreen();
  }
  checkScreen() {
    if (window.visualViewport!.width >= 1280) {
      this.isDesktop = true;
      this.isTablet = false;
      this.isPhone = false;
    }
    if (
      window.visualViewport!.width < 1280 &&
      window.visualViewport!.width >= 768
    ) {
      this.isDesktop = false;
      this.isTablet = true;
      this.isPhone = false;
    }
    if (window.visualViewport!.width < 768) {
      this.isDesktop = false;
      this.isPhone = true;
      this.isTablet = false;
    }
  }
}
