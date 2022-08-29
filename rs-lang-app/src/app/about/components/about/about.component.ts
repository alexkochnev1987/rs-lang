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
  auth?: AuthorizationModule;

  constructor(private pagesDataService: PagesDataService) {}
  ngOnInit(): void {
    this.auth = new AuthorizationModule();
    this.pagesDataService.setPage(AppPages.About);
  }
}
