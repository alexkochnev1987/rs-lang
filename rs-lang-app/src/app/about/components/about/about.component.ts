import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { AuthorizationModule } from 'src/app/authorization/authorization.module';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
})
export class AboutComponent implements OnInit {
  auth?: AuthorizationModule;

  constructor() {}
  ngOnInit(): void {
    this.auth = new AuthorizationModule();
  }
}
