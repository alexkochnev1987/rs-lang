import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { GetUserService } from 'src/app/core/services/query/get-user.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent {
  constructor(private getUser: GetUserService) {}
  getUserName() {
    this.getUser.getUser();
  }
}
