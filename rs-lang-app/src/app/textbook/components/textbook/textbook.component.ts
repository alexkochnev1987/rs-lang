import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-textbook',
  templateUrl: './textbook.component.html',
  styleUrls: ['./textbook.component.scss'],
})
export class TextbookComponent {
  id: number | undefined;
  private subscription: Subscription;
  constructor(private activatedRoute: ActivatedRoute) {
    this.subscription = activatedRoute.params.subscribe(
      params => (this.id = params['id'])
    );
  }
}
